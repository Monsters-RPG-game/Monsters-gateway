import Router from './index.js';
import { EControllers, EStatsActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IGetStatsReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for getting stats.
 */
export default (): Router => {
  const service = new Router(EControllers.Stats, EStatsActions.Get);

  /**
   * @openapi
   * /stats:
   *   get:
   *     tags:
   *       - stats
   *     description: Get user's stats
   *     parameters:
   *       - in: query
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Success. Get user's stats back in request.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   $ref: '#/components/schemas/IStatsEntity'
   *       400:
   *         description: Bad request.
   *         content:
   *           application/json:
   *             schema:
   *               oneOf:
   *                 - $ref: '#/components/schemas/UnauthorizedError'
   *                 - $ref: '#/components/schemas/MissingArgError'
   *                 - $ref: '#/components/schemas/IncorrectArgError'
   */
  service.router.get('/', limitRate, async (req: IGetStatsReq, res) => {
    try {
      const data = await service.execute(req);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
