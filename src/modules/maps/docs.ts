/**
 * @openapi
 * components:
 *   schemas:
 *     IMapEntity:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         height:
 *           type: number
 *         width:
 *           type: number
 *         fields:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               x:
 *                 type: number
 *               y:
 *                 type: number
 *               type:
 *                 type: string
 *                 schema:
 *                   oneOf:
 *                     - field
 *                     - woods
 *               access:
 *                 type: object
 *                 properties:
 *                   top:
 *                     type: boolean
 *                     required: false
 *                   left:
 *                     type: boolean
 *                     required: false
 *                   right:
 *                     type: boolean
 *                     required: false
 *                   bottom:
 *                     type: boolean
 *                     required: false
 *       required:
 *         - name
 *         - height
 *         - width
 *         - fields
 *         - items.x
 *         - items.y
 *         - items.type
 *         - items.access
 */
