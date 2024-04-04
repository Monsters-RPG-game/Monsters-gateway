import type Broker from '../connections/broker/index.js';
import type Mysql from '../connections/mysql/index.js';
import type Redis from '../connections/redis/index.js';
import type WebsocketServer from '../connections/websocket/index.js';
import type Router from '../structure/index.js';
import type { JSONWebKeySet } from 'jose';

export interface IState {
  broker: Broker;
  socket: WebsocketServer;
  router: Router;
  redis: Redis;
  mysql: Mysql;
  keys: JSONWebKeySet;
}

export interface IConfigInterface {
  amqpURI: string;
  corsOrigin: string | string[];
  myAddress: string;
  httpPort: number;
  socketPort: number;
  redisURI: string;
  mysql: {
    user: string;
    password: string;
    host: string;
    db: string;
    port: number;
  };
  session: {
    secret: string;
    secured: boolean;
  };
}
