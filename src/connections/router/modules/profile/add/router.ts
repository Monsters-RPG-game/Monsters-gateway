import Router from './index.js';
import { EControllers, EProfileActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { IAddProfileReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for adding profile.
 */
export default (): Router => {
  const service = new Router(EControllers.Profile, EProfileActions.AddExp);

  /**
   * @openapi
   * /profile:
   *   post:
   *     tags:
   *       - profile
   *     description: Add user profile
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       description: Request body for adding a user profile
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/IAddProfileDto'
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
  service.router.post('/', limitRate, async (req: IAddProfileReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
