/**
 * ESM resolve hook so plain `node` can import project modules that use the
 * `@/` alias and Next's `server-only` guard.
 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();

export function resolve(specifier, context, nextResolve) {
  if (specifier === 'server-only' || specifier === 'client-only') {
    return { url: pathToFileURL(path.join(root, 'scripts/empty-module.mjs')).href, shortCircuit: true };
  }
  if (specifier.startsWith('@/')) {
    // Extensionless alias imports need the .ts suffix Node cannot infer.
    const target = path.join(root, specifier.slice(2));
    const withExt = path.extname(target) ? target : `${target}.ts`;
    return nextResolve(pathToFileURL(withExt).href, context);
  }
  return nextResolve(specifier, context);
}
