import type { JestConfigWithTsJest } from 'ts-jest';
import defaultConfig from './jest.config.default';

const config: JestConfigWithTsJest = {
  ...defaultConfig,
  bail:true,
  setupFilesAfterEnv: ['./utils/setup.ts'],
};

export default config;
