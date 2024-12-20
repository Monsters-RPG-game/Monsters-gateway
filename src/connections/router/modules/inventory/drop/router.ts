import Router from './index.js';
import handleErr from '../../../../../errors/handler.js';
import Controller from '../../../../../modules/inventory/subModules/drop/index.js';
import limitRate from '../../../utils/index.js';
import type { IDropItemReq } from './types.js';
import type * as types from '../../../../../types/index.js';

const service = new Router(new Controller(undefined));

/**
 * @openapi
 * /inventory:
 *   delete:
 *     tags:
 *       - inventory
 *     description: Drop item from inventory
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Request body for dropping item from inventory
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IDropItemDto'
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
service.router.delete('/', limitRate, async (req: IDropItemReq, res) => {
  try {
    const data = await service.execute(req);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
