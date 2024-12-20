import Router from './index.js';
import handleErr from '../../../../../errors/handler.js';
import Controller from '../../../../../modules/singleSkill/subModules/add/index.js';
import limitRate from '../../../utils/index.js';
import type { IAddSingleSkillReq } from './types.js';
import type * as types from '../../../../../types/index.js';

const service = new Router(new Controller(undefined));

service.router.post('/', limitRate, async (req: IAddSingleSkillReq, res) => {
  try {
    const data = await service.execute(req);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
