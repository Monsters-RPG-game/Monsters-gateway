import Router from './index.js';
import { EControllers, EPartyActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IGetPartyReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for getting party.
 */
export default (): Router => {
  const service = new Router(EControllers.Party, EPartyActions.Get);

  /**
   * @openapi
   * /party:
   *   get:
   *     tags:
   *       - party
   *     description: Get party by provided id
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
   *         description: Success. Get party in response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   $ref: '#/components/schemas/IPartyEntity'
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
  service.router.get('/', limitRate, async (req: IGetPartyReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
