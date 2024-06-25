import Router from './index.js';
import handleErr from '../../../../errors/utils.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../types/index.js';

const service = new Router();

service.router.post('/', limitRate, async (req, res) => {
  try {
    const data = await service.add(req, res);
    res.status(200).send(data);
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
