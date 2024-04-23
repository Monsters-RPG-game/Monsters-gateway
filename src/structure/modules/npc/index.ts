import add from './add/router.js';
import get from './get/router.js';
import type { Router } from 'express';

const initNpcRoutes = (router: Router): void => {
  const prefix = '/npc';

  router.use(prefix, get.router).use(prefix, add.router);
};

export default initNpcRoutes;
