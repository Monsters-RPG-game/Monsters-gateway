import type Broker from '../connections/broker/index.js';
import type Redis from '../connections/redis/index.js';
import type Router from '../connections/router/index.js';
import type WebsocketServer from '../connections/websocket/index.js';
import type { JSONWebKeySet } from 'jose';

export interface IState {
  broker: Broker;
  socket: WebsocketServer;
  router: Router;
  redis: Redis;
  keys: JSONWebKeySet;
}

export interface IConfigInterface {
  amqpURI: string;
  corsOrigin: string | string[];
  myAddress: string;
  httpPort: number;
  socketPort: number;
  redisURI: string;
  session: {
    secret: string;
    secured: boolean;
    trustProxy: boolean;
  };
}
