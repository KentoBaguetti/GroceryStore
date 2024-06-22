import mongoose, { Schema, type Document, type Model } from "mongoose";

interface IProduct extends Document {
  id: number;
  name: string;
  category: string;
  price: number;
  description?: string;
  ingredients: string[];
  getId(): number;
  getName(): string;
  getCategory(): string;
  getPrice(): number;
  getDescription(): string | undefined;
  getIngredients(): string[];
  setPrice(newPrice: number): void;
}

const productSchema: Schema<IProduct> = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
});

productSchema.methods.getId = function (): number {
  return this.id;
};

productSchema.methods.getName = function (): string {
  return this.name;
};

productSchema.methods.getCategory = function (): string {
  return this.category;
};

productSchema.methods.getPrice = function (): string {
  return this.price;
};

productSchema.methods.getDescription = function (): string | undefined {
  return this.description;
};

productSchema.methods.getIngredients = function (): string[] {
  return this.ingredients;
};

productSchema.methods.setPrice = function (newPrice: number): void {
  this.price = newPrice;
};

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
export type { IProduct };
