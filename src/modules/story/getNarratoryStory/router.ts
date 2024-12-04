import Router from './index.js';
import handleErr from '../../../errors/utils.js';
import type * as types from '../../../types/index.js';

const service = new Router();

service.router.get('/narrator', async (req, res) => {
  try {
    const data = await service.get(req, res);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
