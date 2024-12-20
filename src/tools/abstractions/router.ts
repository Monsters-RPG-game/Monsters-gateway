import express from 'express';
import type AbstractController from './controller.js';

export default abstract class AbstractRouter<T, U = undefined> {
  readonly _router: express.Router;
  private readonly _controller: AbstractController<T, U>;

  constructor(controller: AbstractController<T, U>) {
    this._router = express.Router();
    this._controller = controller;
  }

  get router(): express.Router {
    return this._router;
  }

  protected get controller(): AbstractController<T, U> {
    return this._controller;
  }

  async execute(_req: express.Request<unknown, unknown, unknown, unknown>, ..._params: unknown[]): Promise<T> {
    return new Promise((resolve) => {
      resolve(undefined as T);
    });
  }
}
