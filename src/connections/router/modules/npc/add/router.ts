import Router from './index.js';
import { EControllers, ENpcActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils/index.js';
import type { IAddCharacterReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for Adding npcs.
 */
export default (): Router => {
  const service = new Router(EControllers.Npc, ENpcActions.Add);

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
  service.router.post('/', Middleware.validateAdmin, limitRate, async (req: IAddCharacterReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
