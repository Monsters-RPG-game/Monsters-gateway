import get from './get/router.js';
import type { Router } from 'express';

/**
 * Initialize routes for stats router.
 * @param router Express router.
 */
const initStatsRoutes = (router: Router): void => {
  const prefix = '/stats';

  router.use(prefix, get().router);
};

export default initStatsRoutes;
