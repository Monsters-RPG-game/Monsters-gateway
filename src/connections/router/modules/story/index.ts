import getByIntent from './getByIntent/router.js';
import getByStage from './getByStage/router.js';
import getNarratorStory from './getNarratorStory/router.js';
import getNpcStory from './getNpcStory/router.js';
import type { Router } from 'express';

/**
 * Initialize routes for story router.
 * @param router Express router.
 */
const initStoryRoutes = (router: Router): void => {
  const prefix = '/story';

  router
    .use(prefix, getNpcStory().router)
    .use(prefix, getByIntent().router)
    .use(prefix, getByStage().router)
    .use(prefix, getNarratorStory().router);
};

export default initStoryRoutes;
