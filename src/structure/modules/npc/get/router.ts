import Router from './index.js';
import handleErr from '../../../../errors/utils.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../types/index.d.js';

const service = new Router();

/**
 * @openapi
 * /npc:
 *   get:
 *     tags:
 *       - npc
 *     description: Get npc's details
 *     parameters:
 *       - in: query
 *         name: lvl
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           oneOf:
 *             - human
 *             - elf
 *             - orc
 *             - dwarf
 *             - goblin
 *             - fairy
 *             - dragonBorn
 *             - troll
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success. Get npc's details back in request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/ICharacterEntity'
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
service.router.get('/', limitRate, async (req, res) => {
  try {
    const data = await service.get(req, res);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
