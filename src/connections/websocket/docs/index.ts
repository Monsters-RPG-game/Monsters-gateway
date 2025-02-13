// Routes

/**
 * @openapi
 *  /ws - connect:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - websocket
 *      description: Connect to the webSocket endpoint.
 *      responses:
 *        200:
 *          description: WebSocket connection established
 *        401:
 *          description: User not logged in
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedError'
 */

/**
 * @openapi
 *  /ws chat - get messages:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - chat
 *      description: Request to get user chat messages
 *      requestBody:
 *        description: Request body getting user messages
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IGetMessageDto'
 *      responses:
 *        200:
 *          description: Get back all user messages,
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IUserMessagesEntity'
 *        401:
 *          description: User not logged in
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedError'
 */

/**
 * @openapi
 *  /ws chat - read message:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - chat
 *      description: Read message.
 *      requestBody:
 *        description: Request body read user chat message
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IReadMessageDto'
 *      responses:
 *        200:
 *          description: Read user message,
 *          type: object
 *          properties:
 *            type:
 *              type: string
 *              example: 'confirmation'
 *        401:
 *          description: User not logged in
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedError'
 */

/**
 * @openapi
 *  /ws chat - get unread:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - chat
 *      description: Get unread chat message.
 *      requestBody:
 *        description: Request body to get unread messages
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IGetMessageDto'
 *      responses:
 *        200:
 *          description: Get back unread user messages,
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IUserMessagesEntity'
 *        401:
 *          description: User not logged in
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedError'
 */

/**
 * @openapi
 *  /ws chat - get detailed:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - chat
 *      description: Get chat messages from 1 conversion with details.
 *      requestBody:
 *        description: Request body to get detailed messages
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IGetDetailedDto'
 *      responses:
 *        200:
 *          description: Get back user messages with details,
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/IDetailedMessagesEntity'
 *        401:
 *          description: User not logged in
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedError'
 */

/**
 * @openapi
 *  /ws chat - send:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - chat
 *      description: Get chat message.
 *      requestBody:
 *        description: Request body to send message
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/IGetDetailedDto'
 *      responses:
 *        200:
 *          description: Get back all user messages,
 *        401:
 *          description: User not logged in
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnauthorizedError'
 */

/**
 * @openapi
 * /ws location - move:
 *   get:
 *     tags:
 *      - location
 *     description: Move character on map
 *     security: []
 *     requestBody:
 *       description: Request body for moving character
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IChangeCharacterLocationDto'
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

/**
 * @openapi
 * /ws location - get:
 *   get:
 *     tags:
 *       - location
 *     description: Get character location
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: character
 *         required: false
 *         schema:
 *           type: string
 *     security: []
 *     responses:
 *       200:
 *         description: Success. Get character location back in request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/IMapEntity'
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

// Entities

/**
 * @openapi
 * components:
 *   schemas:
 *     IUserMessageBody:
 *       type: object
 *       properties:
 *         messages:
 *           type: integer
 *         receiver:
 *           type: string
 *         sender:
 *           type: string
 *
 *     IUserMessagesEntity:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: 'message'
 *         payload:
 *           type: object
 *           properties:
 *             [key: string]:
 *               $ref: '#/components/schemas/IUserMessageBody'
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     IDetailedMessageBody:
 *       type: object
 *       properties:
 *         sender:
 *           type: string
 *         receiver:
 *           type: string
 *         read:
 *           type: boolean
 *         chatId:
 *           type: string
 *         message:
 *           type: string
 *
 *     IDetailedMessagesEntity:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           example: 'message'
 *         payload:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/IDetailedMessageBody'
 */
