import mongoose from 'mongoose';
import type { IOidcClient } from './types.js';

export const oidcClientSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: [true, 'ClientId not provided'],
  },
  clientSecret: {
    type: String,
    required: [true, 'ClientSecret not provided'],
  },
  clientGrant: {
    type: String,
    required: [true, 'ClientGrant not provided'],
  },
  redirectUrl: {
    type: String,
    required: [true, 'RedirectUrls not provided'],
  },
  redirectLogoutUrl: {
    type: String,
    required: [true, 'RedirectUrls not provided'],
  },
});

const OidcClient = mongoose.model<IOidcClient>('OidcClients', oidcClientSchema, 'oidcClients');
export default OidcClient;
