import Router from './index.js';
import handleErr from '../../../../errors/utils.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../types/index.js';

const service = new Router();

/**
 * @openapi
 * /npc:
 *   post:
 *     tags:
 *       - npc
 *     description: Add new npc
 *     security: []
 *     requestBody:
 *       description: Request body for adding new npc
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IAddCharacterDto'
 *     responses:
 *       200:
 *         description: Success. Npc added.
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/NoDataProvidedError'
 *                 - $ref: '#/components/schemas/MissingArgError'
 *                 - $ref: '#/components/schemas/IncorrectArgError'
 */
service.router.post('/', limitRate, Middleware.validateAdmin, async (req, res) => {
  try {
    const data = await service.add(req, res);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
