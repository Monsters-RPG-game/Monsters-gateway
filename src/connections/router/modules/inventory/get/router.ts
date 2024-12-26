import Router from './index.js';
import { EControllers, EItemActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for getting inventory.
 */
export default (): Router => {
  const service = new Router(EControllers.Inventory, EItemActions.Get);

  /**
   * @openapi
   * /inventory:
   *   get:
   *     tags:
   *       - inventory
   *     description: Get user's inventory
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Success. Get user's inventory back in request.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/IInventoryEntity'
   *       400:
   *         description: Bad request.
   *         content:
   *           application/json:
   *             schema:
   *               oneOf:
   *                 - $ref: '#/components/schemas/MissingArgError'
   *                 - $ref: '#/components/schemas/IncorrectArgError'
   *               description: Either required arguments are missing or provided arguments are incorrect.
   *       401:
   *         description: User not logged in
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UnauthorizedError'
   */
  service.router.get('/', limitRate, async (_req, res: types.IResponse) => {
    try {
      const data = await service.execute(res);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
