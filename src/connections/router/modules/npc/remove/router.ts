import Router from './index.js';
import handleErr from '../../../../../errors/handler.js';
import Controller from '../../../../../modules/npc/subModules/remove/index.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils/index.js';
import type { IRemoveCharacterReq } from './types.js';
import type * as types from '../../../../../types/index.js';

const service = new Router(new Controller(undefined));

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
service.router.delete('/', Middleware.validateAdmin, limitRate, async (req: IRemoveCharacterReq, res) => {
  try {
    const data = await service.execute(req);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
