import get from './get/router.js';
import type { Router } from 'express';

/**
 * Initialize routes for profile router.
 * @param router Express router.
 */
const initPartyRoutes = (router: Router): void => {
  const prefix = '/party';

  router.use(prefix, get.router);
};
export default initPartyRoutes;
