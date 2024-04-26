import Router from './index.js';
import handleErr from '../../../../errors/utils.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../types/index.d.js';

const service = new Router();

/**
 * @openapi
 * /npc:
 *   patch:
 *     tags:
 *       - npc
 *     description: Update npc
 *     requestBody:
 *       description: Request body for user registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IUpdateNpcDto'
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
service.router.patch('/', limitRate, Middleware.validateAdmin, async (req, res) => {
  try {
    const data = await service.remove(req, res);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
