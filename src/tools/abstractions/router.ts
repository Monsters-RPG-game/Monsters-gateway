import express from 'express';
import * as errors from '../../errors/index.js';
import State from '../state.js';
import type * as enums from '../../enums/index.js';
import type * as types from '../../types/index.js';

export default abstract class AbstractRouter<T> {
  readonly _router: express.Router;
  readonly _controller: types.IAbstractSubController<T>;

  constructor(target: enums.EControllers, subTarget: types.IControllerActions) {
    this._router = express.Router();

    const controller = State.controllers.resolve(target);
    if (!controller) throw new errors.UnregisteredControllerError(target);

    const subController = controller.resolve(subTarget) as types.IAbstractSubController<T>;
    if (!subController) throw new errors.UnregisteredControllerError(subTarget as string);

    this._controller = subController;
  }

  get router(): express.Router {
    return this._router;
  }

  get controller(): types.IAbstractSubController<T> {
    return this._controller;
  }
}
