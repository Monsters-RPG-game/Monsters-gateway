import Router from './index.js';
import { EControllers, EFightActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IGetFightReq } from './types.js';
import type * as types from '../../../../../types/index.js';

export default (): Router => {
  const service = new Router(EControllers.Fights, EFightActions.GetFights);

  /**
   * @openapi
   * /fights:
   *   get:
   *     tags:
   *       - fights
   *     description: Get fight
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: query
   *         name: active
   *         required: false
   *         description: Optional param used to get active fight
   *         schema:
   *           type: boolean
   *       - in: query
   *         name: page
   *         required: false
   *         description: Optional param used to get 'page'. Page is batch of 10 fights. Default value is 1
   *         schema:
   *           type: number
   *     responses:
   *       200:
   *         description: Success. Got list of fights
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/IFight'
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
  service.router.get('/', limitRate, async (req: IGetFightReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req, res);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
