import get from './get/router.js';
import getByStage from './getByStage/router.js';
import type { Router } from 'express';

const initStoryRoutes = (router: Router): void => {
  const prefix = '/story';

  router.use(prefix, get.router).use(prefix,getByStage.router);
};

export default initStoryRoutes;
