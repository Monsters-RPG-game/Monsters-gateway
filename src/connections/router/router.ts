import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import Middleware from './middleware.js';
import initHealthRoutes from './modules/health/index.js';
import initMessagesRoutes from './modules/messages/index.js';
import initProfileRoutes from './modules/profile/index.js';
import { initSecuredUserRoutes, initUserRoutes } from './modules/user/index.js';
import { FourOhFour } from '../../errors/index.js';
import State from '../../tools/state.js';
import type express from 'express';
import type swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';

export default class AppRouter {
  private readonly _router: express.Router;

  constructor(router: express.Router) {
    this._router = router;
  }

  private get router(): express.Router {
    return this._router;
  }

  initRoutes(): void {
    initUserRoutes(this.router);
    initHealthRoutes(this.router);
  }

  initSecuredRoutes(app: express.Express): void {
    Middleware.userValidation(app);

    this.router.use(Middleware.initUserProfile);

    initProfileRoutes(this.router);

    initSecuredUserRoutes(this.router);
    initMessagesRoutes(this.router);
  }

  initWebsocket(app: express.Express): void {
    app.get('/ws', (req, _res) => {
      State.socket.server.handleUpgrade(req, req.socket, Buffer.from(''), (socket) => {
        State.socket.server.emit('connection', socket, req);
      });
    });
  }

  initFourOhFour(app: express.Express): void {
    app.all('*', (_req, res) => {
      const { status, code, message, name } = new FourOhFour();

      res.status(status).send({
        error: {
          message,
          code,
          name,
        },
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
        './src/modules/*/router.ts',
        './src/modules/*/docs.ts',
        './src/modules/*/*/router.ts',
        './src/modules/*/*/docs.ts',
        './src/modules/*/*/dto.ts',
        './src/modules/*/*/*/router.ts',
        './src/modules/*/*/*/docs.ts',
        './src/modules/*/*/*/dto.ts',
        './src/connections/websocket/docs/index.ts',
        './src/errors/index.js',
        './src/modules/*/router.js',
        './src/modules/*/docs.js',
        './src/modules/*/*/router.js',
        './src/modules/*/*/docs.js',
        './src/modules/*/*/dto.js',
        './src/modules/*/*/*/router.js',
        './src/modules/*/*/*/docs.js',
        './src/modules/*/*/*/dto.js',
        './src/connections/websocket/docs/index.js',
      ],
    };

    const swaggerSpec = swaggerJSDoc(options);
    this.router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.router.get('docs.json', (_req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
  }
}
