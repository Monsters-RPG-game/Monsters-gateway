import type * as types from '../types/index.js';
import fs from 'fs';
import * as path from 'node:path';

/**
 * Generate path based on meta.url
 * This is made in stupid way, but jest seems to be bugging out
 */
const getUrl = (target: string): string => {
  const basePath = import.meta.url.split('/');
  return path.join(basePath.splice(2, basePath.length - 1).join('/'), '..', '..', '..', 'config', target);
};

/**
 * Load config from json files
 */
export default function getConfig(): types.IConfigInterface {
  let baseConfig: types.IConfigInterface = JSON.parse(
    fs
      .readFileSync(
        import.meta.dirname
          ? path.join(import.meta.dirname, '..', '..', 'config', 'exampleConfig.json')
          : getUrl('exampleConfig.json'),
      )
      .toString(),
  ) as types.IConfigInterface;

  switch (process.env.NODE_ENV) {
    case 'testDev':
      baseConfig = JSON.parse(
        fs
          .readFileSync(
            import.meta.dirname
              ? path.join(import.meta.dirname, '..', '..', 'config', 'testConfig.json')
              : getUrl('testConfig.json'),
          )
          .toString(),
      ) as types.IConfigInterface;
      break;
    case 'dev':
    case 'test':
      baseConfig = JSON.parse(
        fs
          .readFileSync(
            import.meta.dirname
              ? path.join(import.meta.dirname, '..', '..', 'config', 'devConfig.json')
              : getUrl('devConfig.json'),
          )
          .toString(),
      ) as types.IConfigInterface;
      break;
    case 'production':
      baseConfig = JSON.parse(
        fs
          .readFileSync(
            import.meta.dirname
              ? path.join(import.meta.dirname, '..', '..', 'config', 'prodConfig.json')
              : getUrl('prodConfig.json'),
          )
          .toString(),
      ) as types.IConfigInterface;
      break;
    default:
      throw new Error('No config files');
  }

  if (!baseConfig.session) throw new Error('Config is incorrect');
  return baseConfig;
}
