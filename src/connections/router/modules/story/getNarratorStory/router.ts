import Router from './index.js';
import { EControllers, EStoryActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IGetNarratorStoryReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for getting stories by narrator.
 */
export default (): Router => {
  const service = new Router(EControllers.Story, EStoryActions.GetNarratorStory);

  service.router.get('/narrator', limitRate, async (req: IGetNarratorStoryReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
