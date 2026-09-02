/**
 * ESM resolve hook so plain `node` can import project modules that use the
 * `@/` alias and Next's `server-only` guard.
 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { existsSync } from 'node:fs';

const root = process.cwd();

export function resolve(specifier, context, nextResolve) {
  if (specifier === 'server-only' || specifier === 'client-only') {
    return { url: pathToFileURL(path.join(root, 'scripts/empty-module.mjs')).href, shortCircuit: true };
  }
  if (specifier.startsWith('@/')) {
    // Extensionless alias imports need the .ts suffix Node cannot infer.
    const target = path.join(root, specifier.slice(2));
    let resolved = target;
    if (!path.extname(target)) {
      // `@/types` may be either types.ts or a types/ directory with index.ts.
      resolved = existsSync(`${target}.ts`) ? `${target}.ts` : path.join(target, 'index.ts');
    }
    return nextResolve(pathToFileURL(resolved).href, context);
  }
  return nextResolve(specifier, context);
}
