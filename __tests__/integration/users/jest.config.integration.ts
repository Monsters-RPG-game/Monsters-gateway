import type { JestConfigWithTsJest } from 'ts-jest';
import defaultConfig from '../../jest.config.default';

const config: JestConfigWithTsJest = {
  ...defaultConfig,
  roots: ['./users'],
  setupFilesAfterEnv: ['./setup.ts'],
};

export default config;
