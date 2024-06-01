import Router from './index.js';
import handleErr from '../../../../errors/utils.js';
import Middleware from '../../../../structure/middleware.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../types/index.js';

const service = new Router();

/**
 * @openapi
 * /maps:
 *   post:
 *     tags:
 *       - maps
 *     description: Add map
 *     security: []
 *     requestBody:
 *       description: Request body for adding map
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ICreateMapDto'
 *     responses:
 *       200:
 *         description: Success
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
service.router.post('/', limitRate, Middleware.validateAdmin, async (req, res) => {
  try {
    const data = await service.create(req, res);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
