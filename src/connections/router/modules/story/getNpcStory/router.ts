import Router from './index.js';
import { EControllers, EStoryActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IGetNpcStoryReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for getting stories by npc story.
 */
export default (): Router => {
  const service = new Router(EControllers.Story, EStoryActions.GetNpcStory);

  service.router.get('/npc', limitRate, async (req: IGetNpcStoryReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
