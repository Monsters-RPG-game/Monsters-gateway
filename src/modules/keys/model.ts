import mongoose from 'mongoose';
import { EDbCollections } from '../../enums/index.js';
import type { IKey } from './types.js';

export const keySchema = new mongoose.Schema(
  {
    kty: {
      type: String,
      required: [true, 'Kty not provided'],
    },
    e: {
      type: String,
      required: [true, 'E not provided'],
    },
    n: {
      type: String,
      required: [true, 'N not provided'],
    },
    d: {
      type: String,
      required: [true, 'D not provided'],
    },
    p: {
      type: String,
      required: [true, 'P not provided'],
    },
    q: {
      type: String,
      required: [true, 'Q not provided'],
    },
    dp: {
      type: String,
      required: [true, 'DP not provided'],
    },
    dq: {
      type: String,
      required: [true, 'DQ not provided'],
    },
    qi: {
      type: String,
      required: [true, 'QI not provided'],
    },
  },
  { timestamps: true },
);

const Key = mongoose.model<IKey>('Keys', keySchema, EDbCollections.Keys);
export default Key;
