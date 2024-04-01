import Log from './logger/index.js';
import type * as types from '../types/index.d.js';
import fs from 'fs';

/**
 * Load config from json files
 */
export default function getConfig(): types.IConfigInterface {
  let baseConfig: types.IConfigInterface = JSON.parse(
    fs.readFileSync('config/exampleConfig.json').toString(),
  ) as types.IConfigInterface;

  switch (process.env.NODE_ENV) {
    case 'testDev':
      baseConfig = JSON.parse(fs.readFileSync('config/testConfig.json').toString()) as types.IConfigInterface;
      break;
    case 'dev':
    case 'test':
      baseConfig = JSON.parse(fs.readFileSync('config/devConfig.json').toString()) as types.IConfigInterface;
      break;
    case 'production':
      baseConfig = JSON.parse(fs.readFileSync('config/prodConfig.json').toString()) as types.IConfigInterface;
      break;
    default:
      throw new Error('No config files');
  }

  if (!baseConfig.session) {
    Log.error('Config', 'Config file is incomplete. Using example config');
    return JSON.parse(fs.readFileSync('config/exampleConfig.json').toString()) as types.IConfigInterface;
  }
  return baseConfig;
}
