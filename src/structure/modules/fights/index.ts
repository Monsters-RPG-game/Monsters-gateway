import attack from './attack/router.js';
import debug from './debug/router.js';
import getFight from './getFights/router.js';
import getFightLogs from './getLogs/router.js';
import leave from './leave/router.js';
import useSkill from './useSkill/router.js';
import type { Router } from 'express';

const initFightsRoutes = (router: Router): void => {
  const prefix = '/fights';

  router
    .use(prefix, leave.router)
    .use(prefix, attack.router)
    .use(prefix, getFight.router)
    .use(prefix, getFightLogs.router)
    .use(prefix,useSkill.router);

  // Debug routes
  if (process.env.NODE_ENV !== 'production') {
    router.use(`/debug${prefix}`, debug.router);
  }
};

export default initFightsRoutes;
