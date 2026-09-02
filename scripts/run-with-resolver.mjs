// Registers the resolve hook, then hands control to the real script.
//
// The wrapper's own path sits in argv where the target script expects its
// first argument, so drop it before handing over — otherwise the script reads
// its own filename as user input.
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('./node-resolver.mjs', import.meta.url);

const [node, , target, ...rest] = process.argv;
process.argv = [node, target, ...rest];

await import(pathToFileURL(target).href);
