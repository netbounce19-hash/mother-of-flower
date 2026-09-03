// Re-encodes a video to web-friendly H.264 at a target bitrate, dropping audio.
//
// Why this exists: the source clips are HEVC at ~8.5 Mbps, which is both far
// heavier than a muted background loop needs and undecodable in Chrome on
// Windows and Android. ffmpeg would be the usual tool, but it is not installed
// here and adding it needs admin rights, so this drives AVFoundation directly.
//
//   swift scripts/compress-video.swift <input> <output> [bitrateKbps] [maxWidth]
//
// Defaults: 1200 kbps, max width 720. Audio is always discarded — every video
// on the site is muted.
import AVFoundation
import Foundation

let args = CommandLine.arguments
guard args.count >= 3 else {
  print("usage: compress-video.swift <input> <output> [bitrateKbps] [maxWidth]")
  exit(1)
}

let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])
let bitrate = args.count > 3 ? Int(args[3])! * 1000 : 1_200_000
let maxWidth = args.count > 4 ? Int(args[4])! : 720

let asset = AVURLAsset(url: input)
let semaphore = DispatchSemaphore(value: 0)
var failure: String?

Task {
  do {
    guard let track = try await asset.loadTracks(withMediaType: .video).first else {
      failure = "no video track"; semaphore.signal(); return
    }

    let naturalSize = try await track.load(.naturalSize)
    let transform = try await track.load(.preferredTransform)
    // The transform carries rotation, so a portrait clip recorded sideways
    // reports a landscape naturalSize. Apply it to get what a viewer sees.
    let displaySize = naturalSize.applying(transform)
    // Frames arrive in the source's own orientation, so size the encoder from
    // naturalSize; the transform above rotates it for the viewer.
    var width = naturalSize.width
    var height = naturalSize.height
    _ = displaySize

    if Int(width) > maxWidth {
      height = (height * CGFloat(maxWidth) / width).rounded()
      width = CGFloat(maxWidth)
    }
    // H.264 encoders want even dimensions.
    let outWidth = Int(width) - Int(width) % 2
    let outHeight = Int(height) - Int(height) % 2

    try? FileManager.default.removeItem(at: output)
    let writer = try AVAssetWriter(outputURL: output, fileType: .mp4)
    let writerInput = AVAssetWriterInput(
      mediaType: .video,
      outputSettings: [
        AVVideoCodecKey: AVVideoCodecType.h264,
        AVVideoWidthKey: outWidth,
        AVVideoHeightKey: outHeight,
        AVVideoCompressionPropertiesKey: [
          AVVideoAverageBitRateKey: bitrate,
          AVVideoMaxKeyFrameIntervalKey: 60,
          AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
          AVVideoAllowFrameReorderingKey: true,
        ],
      ]
    )
    writerInput.expectsMediaDataInRealTime = false
    // Rotation metadata rather than re-drawn pixels: players honour it and it
    // costs nothing to encode.
    writerInput.transform = transform
    writer.add(writerInput)
    // Lets the file start playing before it has fully downloaded.
    writer.shouldOptimizeForNetworkUse = true

    let reader = try AVAssetReader(asset: asset)
    // Reading the track directly and letting the encoder do the scaling avoids
    // AVVideoComposition, which throws here for rotated source clips.
    let readerOutput = AVAssetReaderTrackOutput(
      track: track,
      outputSettings: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]
    )
    readerOutput.alwaysCopiesSampleData = false
    reader.add(readerOutput)

    guard writer.startWriting() else {
      failure = writer.error?.localizedDescription ?? "could not start writing"
      semaphore.signal(); return
    }
    writer.startSession(atSourceTime: .zero)
    guard reader.startReading() else {
      failure = reader.error?.localizedDescription ?? "could not start reading"
      semaphore.signal(); return
    }

    let queue = DispatchQueue(label: "compress")
    writerInput.requestMediaDataWhenReady(on: queue) {
      while writerInput.isReadyForMoreMediaData {
        guard reader.status == .reading, let buffer = readerOutput.copyNextSampleBuffer() else {
          writerInput.markAsFinished()
          writer.finishWriting {
            if reader.status == .failed {
              failure = reader.error?.localizedDescription ?? "read failed"
            } else if writer.status != .completed {
              failure = writer.error?.localizedDescription ?? "write failed"
            }
            semaphore.signal()
          }
          return
        }
        writerInput.append(buffer)
      }
    }
  } catch {
    failure = error.localizedDescription
    semaphore.signal()
  }
}

semaphore.wait()
if let failure {
  print("error: \(failure)")
  exit(1)
}

let size = (try? FileManager.default.attributesOfItem(atPath: output.path)[.size] as? Int) ?? 0
print("wrote \(output.lastPathComponent) — \(String(format: "%.1f", Double(size ?? 0) / 1_048_576)) MB")
