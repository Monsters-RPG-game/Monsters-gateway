import Router from './index.js';
import { EControllers, ENpcActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils/index.js';
import type { IUpdateCharacterReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for updating npcs.
 */
export default (): Router => {
  const service = new Router(EControllers.Npc, ENpcActions.Update);

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
  service.router.patch(
    '/',
    Middleware.validateAdmin,
    limitRate,
    async (req: IUpdateCharacterReq, res: types.IResponse) => {
      try {
        const data = await service.execute(req);
        res.status(200).send({ data });
      } catch (err) {
        handleErr(err as types.IFullError, res);
      }
    },
  );

  return service;
};
