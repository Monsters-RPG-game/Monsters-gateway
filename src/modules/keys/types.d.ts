import type { JWK } from 'jose';
import type mongoose from 'mongoose';

export interface IKey extends JWK, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}
