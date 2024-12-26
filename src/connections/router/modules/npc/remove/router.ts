import Router from './index.js';
import { EControllers, ENpcActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils/index.js';
import type { IRemoveCharacterReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for removing npcs.
 */
export default (): Router => {
  const service = new Router(EControllers.Npc, ENpcActions.Remove);

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
  service.router.delete(
    '/',
    Middleware.validateAdmin,
    limitRate,
    async (req: IRemoveCharacterReq, res: types.IResponse) => {
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
