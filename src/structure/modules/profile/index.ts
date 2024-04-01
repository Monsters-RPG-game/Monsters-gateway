import add from './add/router.js';
import get from './get/router.js';
import type { Router } from 'express';

const initProfileRoutes = (router: Router): void => {
  const prefix = '/profile';

  router.use(prefix, get.router).use(prefix, add.router);
};
export default initProfileRoutes;
