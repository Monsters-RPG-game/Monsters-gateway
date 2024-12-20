import Router from './index.js';
import handleErr from '../../../../../errors/handler.js';
import Controller from '../../../../../modules/story/subModules/getByIntent/index.js';
import limitRate from '../../../utils/index.js';
import type { IGetByIntentReq } from './types.js';
import type * as types from '../../../../../types/index.js';

const service = new Router(new Controller(undefined));

service.router.get('/npc/:npcId/:intent', limitRate, async (req: IGetByIntentReq, res) => {
  try {
    const data = await service.execute(req);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
