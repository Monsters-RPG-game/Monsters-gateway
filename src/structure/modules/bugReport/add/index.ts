import BugReport from './dto.js';
import RouterFactory from '../../../../tools/abstracts/router.js';
import type { IAddBugReport } from './types.js';
import type { IUsersTokens } from '../../../../types/index.js';
import type express from 'express';

export default class BugReportRouter extends RouterFactory {
  async post(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqHandler } = locals;

    const data = new BugReport(req.body as IAddBugReport, locals.userId!);

    await reqHandler.bugReport.add(data, { userId: locals.userId, tempId: locals.tempId });
  }
}
