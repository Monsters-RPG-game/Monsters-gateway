import Router from './index.js';
import handleErr from '../../../../../errors/handler.js';
import Controller from '../../../../../modules/story/subModules/getNpcStory/index.js';
import limitRate from '../../../utils/index.js';
import type { IGetNpcStoryReq } from './types.js';
import type * as types from '../../../../../types/index.js';

const service = new Router(new Controller(undefined));

service.router.get('/npc', limitRate, async (req: IGetNpcStoryReq, res) => {
  try {
    const data = await service.execute(req);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
