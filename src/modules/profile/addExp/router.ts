import Router from './index.js';
import handleErr from '../../../errors/utils.js';
import type * as types from '../../../types/index.js';

const service = new Router();

service.router.post('/exp', async (req, res) => {
  try {
    const data = await service.post(req, res);
    res.status(200).send({ data });
  } catch (error) {
    handleErr(error as types.IFullError, res);
  }
});

export default service;
