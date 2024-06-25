import type { IFakeOidcKey } from '../types/index.js';

// At this point, I have no idea how to manually generate login tokens for tests.
export const fakeAccessToken = (accountId: string, keyNumber: number): IFakeOidcKey => {
  return {
    key: `1FXMXdjUwXTIQ3Qtdbesx0bTPnGJBaVfx2ZgAF9tiD${keyNumber}`,
    body: {
      iat: Date.now() + 20000,
      exp: Date.now() + 20000,
      accountId,
      grantId: 'SH38mOgVxiOrPTl5F-_rOVr_1K85h-XByWUVUi1N1zY',
      gty: 'authorization_code',
      sessionUid: '91zuzPH0GNVXL62OR95IL',
      kind: 'AccessToken',
      jti: `1FXMXdjUwXTIQ3Qtdbesx0bTPnGJBaVfx2ZgAF9tiD${keyNumber}`,
      clientId: 'oidcClient2',
      scope: 'openid',
    },
  };
};
