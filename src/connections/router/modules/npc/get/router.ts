import Router from './index.js';
import { EControllers, ENpcActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IGetCharacterReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialzie routes for getting npcs.
 */
export default (): Router => {
  const service = new Router(EControllers.Npc, ENpcActions.Get);

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
  service.router.get('/', limitRate, async (req: IGetCharacterReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
