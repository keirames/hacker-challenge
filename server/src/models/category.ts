import { model, Schema, Model, Document } from "mongoose";

const categorySchema: Schema = new Schema({
  name: { type: String, minlength: 5, required: true },
});

interface ICategory extends Document {
  name: String;
}

const Category: Model<ICategory> = model<ICategory>("Category", categorySchema);

export { categorySchema, Category };
