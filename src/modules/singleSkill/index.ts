import add from './add/router.js';
import get from './get/router.js';
import type { Router } from 'express';

const initSingleSkillRoutes = (router: Router): void => {
  const prefix = '/skill';

  router.use(prefix, get.router).use(prefix, add.router);
};

export default initSingleSkillRoutes;
