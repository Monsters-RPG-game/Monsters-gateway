import add from './add/router.js';
import addExp from './addExp/router.js';
import get from './get/router.js';
import type { Router } from 'express';

const initProfileRoutes = (router: Router): void => {
  const prefix = '/profile';

  router.use(prefix, get.router).use(prefix, add.router).use(prefix, addExp.router);
};
export default initProfileRoutes;
