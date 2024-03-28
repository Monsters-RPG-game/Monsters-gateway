import Router from './index';
import handleErr from '../../../../errors/utils';
import limitRate from '../../../utils';
import type * as types from '../../../../types';

const service = new Router();

/**
 * @openapi
 * /users:
 *   delete:
 *     tags:
 *       - user
 *     description: Remove user
 *     security: []
 *     responses:
 *       200:
 *         description: Success. User removed.
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
service.router.delete('/remove', limitRate, async (req, res) => {
  try {
    await service.delete(req, res);
    res.status(200).send();
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

/**
 * @openapi
 * /users:
 *   post:
 *     tags:
 *       - user
 *     description: Remove user
 *     security: []
 *     requestBody:
 *       description: Request body for confirming account removal
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IRemoveAccountDto'
 *     responses:
 *       200:
 *         description: Success. User removed.
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
service.router.post('/remove', limitRate, async (req, res) => {
  try {
    await service.post(req, res);
    res.status(200).send();
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
