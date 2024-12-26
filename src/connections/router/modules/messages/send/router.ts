import Router from './index.js';
import { EControllers, EMessageActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils/index.js';
import type { ISendMessagesReq } from './types.js';
import type * as types from '../../../../../types/index.js';

/**
 * Initialize routes for sending messages.
 */
export default (): Router => {
  const service = new Router(EControllers.Messages, EMessageActions.Send);

  /**
   * @openapi
   * /messages/send:
   *   post:
   *     tags:
   *       - messages
   *     description: Send user messages
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       description: Request body for sending user message
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ISendMessageDto'
   *     responses:
   *       200:
   *         description: Success. Sent message
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
  service.router.post('/send', limitRate, async (req: ISendMessagesReq, res: types.IResponse) => {
    try {
      const data = await service.execute(req);
      res.status(200).send({ data });
    } catch (err) {
      handleErr(err as types.IFullError, res);
    }
  });

  return service;
};
