import type { JestConfigWithTsJest } from 'ts-jest';
import defaultConfig from './jest.config.default.js';

const config: JestConfigWithTsJest = {
  ...defaultConfig,
  roots: ['./'],
};

export default config;
