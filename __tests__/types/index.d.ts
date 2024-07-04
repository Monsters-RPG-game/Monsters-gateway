export { IProfileEntity } from '../../src/structure/modules/profile/entity';
export { IAddProfileDto } from '../../src/structure/modules/profile/add/types';
export { IGetProfileDto } from '../../src/structure/modules/profile/get/types';
export { ILoginDto } from '../../src/structure/modules/oidc/interaction/types';
export { IRegisterDto } from '../../src/structure/modules/user/register/types';

export * from './users';
export * from './broker';

export interface IFakeOidcKey {
  key: string;
  body: Record<string, unknown>;
}
