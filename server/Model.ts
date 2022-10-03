import mongoose, { Schema, Document } from "mongoose";

export interface IModel extends Document {
  idempotencyKey: string;
  amount: number;
  createdAt: Date;
}

const modelSchema: Schema = new mongoose.Schema(
  {
    idempotencyKey: { type: String, required: true },
    amount: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

export default mongoose.model<IModel>("Model", modelSchema);
