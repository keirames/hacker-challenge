import { model, Schema, Model, Document } from "mongoose";
import Joi from "@hapi/joi";

const categorySchema: Schema = new Schema({
  name: { type: String, unique: true, minlength: 5, required: true },
});

interface ICategory extends Document {
  name: String;
}

const Category: Model<ICategory> = model<ICategory>("Category", categorySchema);

const validateCategory = (category: any) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(category);
};

export { categorySchema, Category, validateCategory };
