import get from './get/router.js';
import getIntent from './getIntent/router.js';
import type { Router } from 'express';

const initStoryRoutes = (router: Router): void => {
  const prefix = '/story';

  router.use(prefix, get.router).use(prefix,getIntent.router);
};

export default initStoryRoutes;
