import State from '../../../state.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import type { IHealth } from '../types.js';
import type express from 'express';

export default class HealthRouter extends RouterFactory {
  get(_req: express.Request, _res: express.Response): IHealth {
    return State.broker.getHealth();
  }
}
