/**
 * @openapi
 * components:
 *   schemas:
 *     IInventoryEntity:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *               quantity:
 *                 type: number
 *             required:
 *               - itemId
 *               - quantity
 *       required:
 *         - _id
 *         - userId
 *         - items
 */
