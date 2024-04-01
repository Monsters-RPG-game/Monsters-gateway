import interaction from './interaction/router.js';
import type { Router } from 'express';

const initOidcRoutes = (router: Router): void => {
  const prefix = '/interaction';

  router.use(prefix, interaction.router);
};

export default initOidcRoutes;
