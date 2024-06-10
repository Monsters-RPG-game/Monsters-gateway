import get from './get/router.js';
import type { Router } from 'express';

const initSkillsRoutes = (router: Router): void => {
  const prefix = '/skills';

  router.use(prefix, get.router);
};

export default initSkillsRoutes;
