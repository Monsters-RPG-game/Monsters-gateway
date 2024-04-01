import debug from './debug/router.js';
import getDetails from './details/router.js';
import register from './register/router.js';
import remove from './remove/router.js';
import type { Router } from 'express';

export const initSecuredUserRoutes = (router: Router): void => {
  const prefix = '/users';

  router.use(prefix, getDetails.router);
};

export const initUserRoutes = (router: Router): void => {
  const prefix = '/users';

  router.use(prefix, register.router).use(prefix, remove.router);

  // Debug routes
  if (process.env.NODE_ENV !== 'production') {
    router.use(prefix, debug.router);
  }
};
