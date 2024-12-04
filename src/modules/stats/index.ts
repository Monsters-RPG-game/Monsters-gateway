import get from './get/router.js';
import type { Router } from 'express';

const initSecuredUserRoutes = (router: Router): void => {
  const prefix = '/stats';

  router.use(prefix, get.router);
};

export default initSecuredUserRoutes;
