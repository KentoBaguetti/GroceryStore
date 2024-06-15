import mongoose, { Schema, Document, Model } from "mongoose";

interface IProduct extends Document {
  id: number;
  name: String;
  price: Number;
  description: String;
  ingredients: String[];
  getId(): number;
  getName(): String;
  getPrice(): Number;
  getDescription(): String;
  getIngredients(): String[];
  setPrice(newPrice: Number): void;
}

const productSchema: Schema<IProduct> = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  ingredients: { type: [String], required: true },
});

productSchema.methods.getId = function (): number {
  return this.id;
};

productSchema.methods.getName = function (): String {
  return this.name;
};

productSchema.methods.getPrice = function (): String {
  return this.price;
};

productSchema.methods.getDescription = function (): String {
  return this.description;
};

productSchema.methods.getIngredients = function (): String[] {
  return this.ingredients;
};

productSchema.methods.setPrice = function (newPrice: Number): void {
  this.price = newPrice;
};

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
export { IProduct };
