import Router from './index.js';
import { EControllers, EStoryActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IGetByStageReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for getting stories by stage.
 */
export default (): Router => {
  const service = new Router(EControllers.Story, EStoryActions.GetByStage);

  service.router.get(
    '/narrator/:episode/:stage/:chapter',
    limitRate,
    async (req: IGetByStageReq, res: types.IResponse) => {
      try {
        const data = await service.execute(req);
        res.status(200).send({ data });
      } catch (err) {
        handleErr(err as types.IFullError, res);
      }
    },
  );

  return service;
};
