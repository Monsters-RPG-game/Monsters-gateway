import create from './create/router.js';
import get from './get/router.js';

import type { Router } from 'express';

const initProfileRoutes = (router: Router): void => {
  const prefix = '/maps';

  router.use(prefix, get.router).use(prefix, create.router);
};

export default initProfileRoutes;
