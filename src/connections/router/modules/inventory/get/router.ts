import Router from './index.js';
import handleErr from '../../../../../errors/handler.js';
import Controller from '../../../../../modules/inventory/subModules/get/index.js';
import limitRate from '../../../utils/index.js';
import type * as types from '../../../../../types/index.js';

const service = new Router(new Controller(undefined));

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
service.router.get('/', limitRate, async (req, res) => {
  try {
    const data = await service.execute(req);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
