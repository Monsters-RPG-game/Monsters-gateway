import Router from './index.js';
import { EControllers, EStoryActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IGetByIntentReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for getting story by intent.
 */
export default (): Router => {
  const service = new Router(EControllers.Story, EStoryActions.GetByIntent);

  service.router.get('/npc/:npcId/:intent', limitRate, async (req: IGetByIntentReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
