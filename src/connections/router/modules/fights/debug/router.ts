import Router from './index.js';
import { EControllers, EFightActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IDebugReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Start debug fights router.
 */
export default (): Router => {
  const service = new Router(EControllers.Fights, EFightActions.Debug);

  /**
   * @openapi
   * /debug/fights/create:
   *   get:
   *     tags:
   *       - fights-debug
   *     description: Create fight
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       description: Request body for creating fight
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ICreateFight'
   *     responses:
   *       200:
   *         description: Success. Fight created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/IProfileUpdateEntity'
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
  service.router.post('/create', limitRate, async (req: IDebugReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req, res);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
