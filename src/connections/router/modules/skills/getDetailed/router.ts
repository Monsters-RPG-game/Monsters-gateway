import Router from './index.js';
import { EControllers, ESkillsActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IGetDetailedSkillsReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for geting detailed skills.
 */
export default (): Router => {
  const service = new Router(EControllers.Skills, ESkillsActions.GetDetailed);

  service.router.get('/detailed', limitRate, async (req: IGetDetailedSkillsReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
