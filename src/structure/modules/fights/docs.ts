/**
 * @openapi
 * components:
 *   schemas:
 *     IStateTeam:
 *       type: object
 *       properties:
 *         character:
 *           type: string
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ICreateFight:
 *       type: object
 *       properties:
 *         teams:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     IActionEntity:
 *       type: object
 *       properties:
 *         character:
 *           type: string
 *         action:
 *           type: string
 *         target:
 *           type: string
 *         value:
 *           type: number
 *       required:
 *         - character
 *         - action
 *         - target
 *         - value
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     IFightLogsEntity:
 *       type: object
 *       properties:
 *         logs:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               phase:
 *                 type: number
 *               actions:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/IActionEntity'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     IFightTeam:
 *       type: object
 *       properties:
 *         character:
 *           type: string
 *         action:
 *           type: string
 *         target:
 *           type: string
 *         value:
 *           type: number
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     IState:
 *       type: object
 *       properties:
 *         initialized:
 *           type: object
 *           properties:
 *             teams:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IStateTeam'
 *         current:
 *           type: object
 *           properties:
 *             teams:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IStateTeam'
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     IFight:
 *       type: object
 *       properties:
 *         states:
 *           $ref: '#/components/schemas/IState'
 *         log:
 *           $ref: '#/components/schemas/IFightLogsEntity'
 */
