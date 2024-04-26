import add from './add/router.js';
import get from './get/router.js';
import remove from './remove/router.js';
import update from './update/router.js';
import type { Router } from 'express';

const initNpcRoutes = (router: Router): void => {
  const prefix = '/npc';

  router.use(prefix, get.router).use(prefix, add.router).use(prefix, remove.router).use(prefix, update.router);
};

export default initNpcRoutes;
