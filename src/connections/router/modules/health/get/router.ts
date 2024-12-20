import Router from './index.js';
import handleErr from '../../../../../errors/handler.js';
import Controller from '../../../../../modules/health/subModules/get/index.js';
import limitRate from '../../../utils/index.js';
import type * as types from '../../../../../types/index.js';

const service = new Router(new Controller(undefined));

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - health
 *     description: Check if services are responding
 *     responses:
 *       200:
 *         description: Success. Got information about services
 */
service.router.get('/', limitRate, async (_req, res) => {
  try {
    const data = await service.execute();
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
