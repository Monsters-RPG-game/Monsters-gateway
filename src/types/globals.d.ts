import type { IUsersTokens } from './user.js';

declare global {
  namespace express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Response {
      locals: IUsersTokens;
    }
  }
}
