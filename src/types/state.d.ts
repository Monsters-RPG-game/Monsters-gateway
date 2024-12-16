import type Broker from '../connections/broker/index.js';
import type Mongo from '../connections/mongo/index.js';
import type Redis from '../connections/redis/index.js';
import type Router from '../connections/router/index.js';
import type WebsocketServer from '../connections/websocket/index.js';
import type { JSONWebKeySet } from 'jose';

export interface IState {
  broker: Broker;
  mongo: Mongo;
  socket: WebsocketServer;
  router: Router;
  redis: Redis;
  keys: JSONWebKeySet;
}

export interface IConfigInterface {
  amqpURI: string;
  authorizationAddress: string;
  corsOrigin: string | string[];
  httpPort: number;
  mongoURI: string;
  myAddress: string;
  myDomain: string;
  redisURI: string;
  socketPort: number;
  session: {
    secret: string;
    secured: boolean;
    trustProxy: boolean;
  };
}
