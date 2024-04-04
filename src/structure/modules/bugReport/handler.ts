import * as enums from '../../../enums/index.js';
import ReqHandler from '../../../tools/abstracts/reqHandler.js';
import type AddBugReport from './add/dto.js';
import type { IUserBrokerInfo } from '../../../types/index.d.js';

export default class Message extends ReqHandler {
  async add(data: AddBugReport, userData: IUserBrokerInfo): Promise<void> {
    await this.sendReq(
      this.service,
      enums.EUserMainTargets.BugReport,
      enums.EBugReportTargets.AddBugReport,
      userData,
      data,
    );
  }
}
