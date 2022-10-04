import mongoose, { Schema, Document } from "mongoose";

export interface IModel extends Document {
  idempotencyKey: string;
  amount: number;
  createdAt: Date;
  greetings: string;
}

const modelSchema: Schema = new mongoose.Schema(
  {
    idempotencyKey: { type: String, required: true },
    amount: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    greetings: { type: String, minlength: [3, "Min password length is 3 characters"] },
  },
  { timestamps: true }
);

export default mongoose.model<IModel>("Model", modelSchema);
