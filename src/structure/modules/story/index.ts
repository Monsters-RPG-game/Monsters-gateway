import addUserCompletion from './addUserCompletion/router.js';
import getByStage from './getByStage/router.js';
import getIntent from './getIntent/router.js';
import getNarratorStory from './getNarratoryStory/router.js';
import getNpcStory from './getNpcStory/router.js';
import getUserCompletion from './getUserCompletion/router.js';
import type { Router } from 'express';

const initStoryRoutes = (router: Router): void => {
  const prefix = '/story';

  router
    .use(prefix, getNpcStory.router)
    .use(prefix, getIntent.router)
    .use(prefix, getByStage.router)
    .use(prefix, getNarratorStory.router)
    .use(prefix, addUserCompletion.router)
    .use(prefix, getUserCompletion.router);
};

export default initStoryRoutes;
