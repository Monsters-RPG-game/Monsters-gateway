import add from './add/router.js';
import get from './get/router.js';
import type { Router } from 'express';

const initLogsRoutes = (router: Router): void => {
  const prefix = '/logs';

  router.use(prefix, get.router).use(prefix, add.router);
};
export default initLogsRoutes;
