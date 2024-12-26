import Router from './index.js';
import { EControllers, EItemActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IUseItemReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for using inventory.
 */
export default (): Router => {
  const service = new Router(EControllers.Inventory, EItemActions.Use);

  /**
   * @openapi
   * /inventory:
   *   post:
   *     tags:
   *       - inventory
   *     description: Use item from inventory
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       description: Request body for using item from inventory
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/IUseItemDto'
   *     responses:
   *       200:
   *         description: Success. Empty response.
   *       400:
   *         description: Bad request.
   *         content:
   *           application/json:
   *             schema:
   *               oneOf:
   *                 - $ref: '#/components/schemas/NoDataProvidedError'
   *                 - $ref: '#/components/schemas/MissingArgError'
   *                 - $ref: '#/components/schemas/IncorrectArgError'
   *       401:
   *         description: User not logged in
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UnauthorizedError'
   */
  service.router.post('/', limitRate, async (req: IUseItemReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req, res);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
