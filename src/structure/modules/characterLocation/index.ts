import change from './change/router.js';
import get from './get/router.js';

import type { Router } from 'express';

const initProfileRoutes = (router: Router): void => {
  const prefix = '/location';

  router.use(prefix, get.router).use(prefix, change.router);
};

export default initProfileRoutes;
