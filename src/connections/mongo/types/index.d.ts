import type { IClientEntity } from '../../../modules/clients/entity';
import type { IOidcClientEntity } from '../../../modules/oidcClients/entity';
import type { ITokenEntity } from '../../../modules/tokens/entity';
import type { JWK } from 'jose';
import type mongoose from 'mongoose';

export interface IClient extends IClientEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface IOidcClient extends IOidcClientEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface IToken extends ITokenEntity, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

export interface IKey extends JWK, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
