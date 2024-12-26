import Router from './index.js';
import { EControllers, EProfileActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IAddExpReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for add exp routes.
 */
export default (): Router => {
  const service = new Router(EControllers.Profile, EProfileActions.AddExp);

  service.router.post('/exp', limitRate, async (req: IAddExpReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
