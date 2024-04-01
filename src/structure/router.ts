import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import Middleware from './middleware.js';
import initBugReportRoutes from './modules/bugReport/index.js';
import initFightsRoutes from './modules/fights/index.js';
import initHealthRoutes from './modules/health/index.js';
import initInventoryRoutes from './modules/inventory/index.js';
import initLogsRoutes from './modules/logs/index.js';
import initMessagesRoutes from './modules/message/index.js';
import initOidcRoutes from './modules/oidc/index.js';
import initPartyRoutes from './modules/party/index.js';
import initProfileRoutes from './modules/profile/index.js';
import { initSecuredUserRoutes, initUserRoutes } from './modules/user/index.js';
import type { Express, Router } from 'express';
import type swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';

export default class AppRouter {
  private readonly _router: Router;

  constructor(router: Router) {
    this._router = router;
  }

  private get router(): Router {
    return this._router;
  }

  initRoutes(): void {
    initUserRoutes(this.router);
    initOidcRoutes(this.router);
    initHealthRoutes(this.router);
  }

  initSecuredRoutes(app: Express): void {
    Middleware.userValidation(app);

    initLogsRoutes(this.router);
    initBugReportRoutes(this.router);

    this.router.use(Middleware.initUserProfile);

    initProfileRoutes(this.router);

    this.router.use(Middleware.userProfileValidation);

    initSecuredUserRoutes(this.router);
    initPartyRoutes(this.router);
    initMessagesRoutes(this.router);
    initInventoryRoutes(this.router);
    initFightsRoutes(this.router);
  }

  generateDocumentation(): void {
    const jsonPackage = JSON.parse(fs.readFileSync('package.json').toString()) as Record<string, string>;
    const options: swaggerJsdoc.Options = {
      definition: {
        openapi: '3.0.1',
        description: 'This is a REST API for monsters game',
        servers: [
          {
            url: 'http://localhost',
            description: 'Development server',
          },
        ],
        info: {
          title: 'Monsters API doc',
          version: jsonPackage.version as string,
        },
        component: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
            refreshToken: {
              type: 'http',
              scheme: 'x-refresh-token',
              bearerFormat: 'JWT',
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      apis: [
        './src/errors/index.ts',
        './src/structure/modules/*/router.ts',
        './src/structure/modules/*/entity.d.ts',
        './src/structure/modules/*/types.d.ts',
        './src/structure/modules/*/*/router.ts',
        './src/structure/modules/*/*/entity.d.ts',
        './src/structure/modules/*/*/types.d.ts',
        './src/structure/modules/*/*/*/router.ts',
        './src/structure/modules/*/*/*/entity.d.ts',
        './src/structure/modules/*/*/*/types.d.ts',
        './src/connections/websocket/docs/index.ts',
        './src/connections/websocket/types/dto.d.ts',
        './src/connections/websocket/types/entities.d.ts',
      ],
    };

    const swaggerSpec = swaggerJSDoc(options);
    this.router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.router.get('docs.json', (_req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
  }
}
