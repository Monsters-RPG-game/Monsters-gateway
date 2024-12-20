import Router from './index.js';
import handleErr from '../../../../../errors/handler.js';
import Controller from '../../../../../modules/fights/subModules/useSkill/index.js';
import limitRate from '../../../utils/index.js';
import type { IUseSkillReq } from './types.js';
import type * as types from '../../../../../types/index.js';

const service = new Router(new Controller(undefined));

/**
 * @openapi
 * /fights/attack:
 *   post:
 *     tags:
 *       - fights
 *     description: Attack target
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Request body for attacking enemies in fights
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IAttackDto'
 *     responses:
 *       200:
 *         description: Success. Get attack stage report back
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/IActionEntity'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/MissingArgError'
 *                 - $ref: '#/components/schemas/IncorrectArgError'
 *               description: Either required arguments are missing or provided arguments are incorrect.
 *       401:
 *         description: User not logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedError'
 */
service.router.post('/skill', limitRate, async (req: IUseSkillReq, res) => {
  try {
    const data = await service.execute(req);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
