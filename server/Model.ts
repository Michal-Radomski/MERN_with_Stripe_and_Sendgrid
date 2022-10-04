//* V2 -> Typegoose Model
import { prop, getModelForClass, modelOptions, DocumentType } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true, collection: "models" } })
class modelClass {
  @prop({ required: true })
  public idempotencyKey!: string;

  @prop({ required: true })
  public amount!: number;

  @prop({ default: new Date() })
  public createdAt!: Date;

  @prop({ required: true, minlength: 3 })
  public greetings!: string;
}

export type IModel = DocumentType<modelClass>;
export const Model = getModelForClass(modelClass);

//* V1 -> Classic Mongoose Model
// import mongoose, { Schema, Document } from "mongoose";

// export interface IModel extends Document {
//   idempotencyKey: string;
//   amount: number;
//   createdAt: Date;
//   greetings: string;
// }

// const modelSchema: Schema = new mongoose.Schema(
//   {
//     idempotencyKey: { type: String, required: true },
//     amount: { type: String, required: true },
//     createdAt: { type: Date, default: new Date() },
//     greetings: { type: String, minlength: [3, "Min password length is 3 characters"] },
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IModel>("Model", modelSchema);
