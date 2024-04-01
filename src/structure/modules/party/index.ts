import get from './get/router.js';
import type { Router } from 'express';

const initPartyRoutes = (router: Router): void => {
  const prefix = '/party';

  router.use(prefix, get.router);
};
export default initPartyRoutes;
