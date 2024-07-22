import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import Middleware from './middleware.js';
import initBugReportRoutes from './modules/bugReport/index.js';
import initFightsRoutes from './modules/fights/index.js';
import initHealthRoutes from './modules/health/index.js';
import initInventoryRoutes from './modules/inventory/index.js';
import initMapRoutes from './modules/maps/index.js';
import initMessagesRoutes from './modules/message/index.js';
import initNarratorStoryRoutes from './modules/narratorStory/index.js';
import initNpcRoutes from './modules/npc/index.js';
import initNpcStoryRoutes from './modules/npcStory/index.js';
import initOidcRoutes from './modules/oidc/index.js';
import initPartyRoutes from './modules/party/index.js';
import initProfileRoutes from './modules/profile/index.js';
import initSingleSkillRoutes from './modules/singleSkill/index.js';
import initSkillsRoutes from './modules/skills/index.js';
import initStatsRoutes from './modules/stats/index.js';
import { initSecuredUserRoutes, initUserRemoveAccountRoutes, initUserRoutes } from './modules/user/index.js';
import State from '../state.js';
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

    initBugReportRoutes(this.router);
    initUserRemoveAccountRoutes(this.router);

    this.router.use(Middleware.initUserProfile);

    initProfileRoutes(this.router);

    this.router.use(Middleware.userProfileValidation);

    initSecuredUserRoutes(this.router);
    initPartyRoutes(this.router);
    initMessagesRoutes(this.router);
    initInventoryRoutes(this.router);
    initSkillsRoutes(this.router);
    initSingleSkillRoutes(this.router);
    initFightsRoutes(this.router);
    initNpcRoutes(this.router);
    initNarratorStoryRoutes(this.router);
    initNpcStoryRoutes(this.router);
    initStatsRoutes(this.router);
    initNpcRoutes(this.router);
    initMapRoutes(this.router);
  }

  initWebsocket(app: Express): void {
    app.get('/ws', (req, _res) => {
      State.socket.getServer().handleUpgrade(req, req.socket, Buffer.from(''), (socket) => {
        State.socket.getServer().emit('connection', socket, req);
      });
    });
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
        './src/structure/modules/*/docs.ts',
        './src/structure/modules/*/*/router.ts',
        './src/structure/modules/*/*/docs.ts',
        './src/structure/modules/*/*/dto.ts',
        './src/structure/modules/*/*/*/router.ts',
        './src/structure/modules/*/*/*/docs.ts',
        './src/structure/modules/*/*/*/dto.ts',
        './src/connections/websocket/docs/index.ts',
        './src/errors/index.js',
        './src/structure/modules/*/router.js',
        './src/structure/modules/*/docs.js',
        './src/structure/modules/*/*/router.js',
        './src/structure/modules/*/*/docs.js',
        './src/structure/modules/*/*/dto.js',
        './src/structure/modules/*/*/*/router.js',
        './src/structure/modules/*/*/*/docs.js',
        './src/structure/modules/*/*/*/dto.js',
        './src/connections/websocket/docs/index.js',
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
