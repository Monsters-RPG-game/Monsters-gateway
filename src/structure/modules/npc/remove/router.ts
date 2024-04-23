import Router from './index.js';
import handleErr from '../../../../errors/utils.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../types/index.d.js';

const service = new Router();

/**
 * @openapi
 * /npc:
 *   delete:
 *     tags:
 *       - npc
 *     description: Remove npc
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
 *         description: Success. Npc removed.
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
service.router.delete('/', limitRate, Middleware.validateAdmin, async (req, res) => {
  try {
    const data = await service.remove(req, res);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
