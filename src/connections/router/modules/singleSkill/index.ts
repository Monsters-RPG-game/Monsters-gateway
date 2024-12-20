import add from './add/router.js';
import get from './get/router.js';
import type { Router } from 'express';

/**
 * Initialize routes for single skill router.
 * @param router Express router.
 */
const initSingleSkillRoutes = (router: Router): void => {
  const prefix = '/skill';

  router.use(prefix, get.router).use(prefix, add.router);
};

export default initSingleSkillRoutes;
