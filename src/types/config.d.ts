export interface IConfigInterface {
  amqpURI: string;
  authorizationAddress: string;
  corsOrigin: string[];
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
