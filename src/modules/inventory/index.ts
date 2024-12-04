import drop from './drop/router.js';
import get from './get/router.js';
import use from './use/router.js';
import type { Router } from 'express';

const initInventoryRoutes = (router: Router): void => {
  const prefix = '/inventory';

  router.use(prefix, drop.router).use(prefix, use.router).use(prefix, get.router);
};

export default initInventoryRoutes;
