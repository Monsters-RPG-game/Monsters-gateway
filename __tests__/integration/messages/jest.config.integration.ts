import type { JestConfigWithTsJest } from 'ts-jest';
import defaultConfig from '../../jest.config.default';

const config: JestConfigWithTsJest = {
  ...defaultConfig,
  roots: ['./messages'],
  setupFilesAfterEnv: ['./setup.ts'],
};

export default config;
