import AbstractController from '../../../../tools/abstractions/controller.js';
import State from '../../../../tools/state.js';
import type { IHealth } from './types.js';

export default class GetHealthController extends AbstractController<IHealth> {
  override async execute(): Promise<IHealth> {
    return new Promise((resolve) => {
      resolve(State.broker.getHealth());
    });
  }
}
