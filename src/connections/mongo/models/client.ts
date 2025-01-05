import mongoose from 'mongoose';
import type { IClient } from '../types/index.js';

export const clientSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: [true, 'Client_id not provided'],
  },
  redirectUrl: {
    type: String,
    required: [true, 'Redirect_urls not provided'],
  },
  failUrl: {
    type: String,
    required: [true, 'Fail url not provided'],
  },
});

const Client = mongoose.model<IClient>('Clients', clientSchema);
export default Client;
