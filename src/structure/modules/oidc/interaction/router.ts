import Router from './index.js';
import handleErr from '../../../../errors/utils.js';
import Log from '../../../../tools/logger/index.js';
import Middleware from '../../../middleware.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../types/index.d.js';

const service = new Router();

/**
 * @openapi
 * /interaction/:grant:
 *   get:
 *     tags:
 *       - interaction
 *     description: Init oidc interaction
 *     responses:
 *       200:
 *         description: Success. Moved user to login site
 *       401:
 *         description: Incorrect oidc params.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 */
service.router.get('/:grant', Middleware.setNoCache, limitRate, async (req, res, next) => {
  try {
    await service.get(req, res, next);
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

/**
 * @openapi
 * /interaction/:grant:
 *   post:
 *     tags:
 *       - interaction
 *     description: Validate user input and create login token
 *     security: []
 *     requestBody:
 *       description: Request body for logging in
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ILoginDto'
 *     responses:
 *       200:
 *         description: Success. The user is logged in.
 *         x-token-url:
 *           description: On success, user will be redirected to previously provided path with code in url
 *           value: "/code=....."
 */
service.router.post('/:grant/login', Middleware.setNoCache, limitRate, async (req, res) => {
  try {
    await service.post(req, res);
  } catch (err) {
    // It is possible for provider to throw an error when session expires, but user tries to send requests.
    Log.error('Error', (err as types.IFullError).message, (err as types.IFullError).stack);

    res.type('html');
    res.render('error', {
      name: (err as types.IFullError).name ?? 'Unknown error',
      message:
        (err as types.IFullError).message ?? 'Unknown error occured. Please access previous website and try again',
    });
  }
});

/**
 * @openapi
 * /interaction/:uid/confirm:
 *   post:
 *     tags:
 *       - interaction
 *     description: Confirm consent
 */
service.router.post('/:uid/confirm', Middleware.setNoCache, limitRate, async (req, res) => {
  try {
    await service.confirm(req, res);
  } catch (err) {
    // It is possible for provider to throw an error when session expires, but user tries to send requests.
    Log.error('Error', (err as types.IFullError).message, (err as types.IFullError).stack);

    res.type('html');
    res.render('error', {
      name: (err as types.IFullError).name ?? 'Unknown error',
      message:
        (err as types.IFullError).message ?? 'Unknown error occured. Please access previous website and try again',
    });
  }
});

/**
 * @openapi
 * /interaction/:uid/abort:
 *   post:
 *     tags:
 *       - interaction
 *     description: Abort consent
 */
service.router.post('/:grant/abort', Middleware.setNoCache, limitRate, async (req, res) => {
  try {
    await service.abort(req, res);
  } catch (err) {
    // It is possible for provider to throw an error when session expires, but user tries to send requests.
    Log.error('Error', (err as types.IFullError).message, (err as types.IFullError).stack);

    res.type('html');
    res.render('error', {
      name: (err as types.IFullError).name ?? 'Unknown error',
      message:
        (err as types.IFullError).message ?? 'Unknown error occured. Please access previous website and try again',
    });
  }
});

export default service;
