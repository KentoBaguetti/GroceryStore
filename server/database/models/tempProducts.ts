interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  ingredients: Ingredient[];
}

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

class Product implements Product {
  id: number;
  name: string;
  price: number;
  description: string;
  ingredients: Ingredient[];

  constructor(
    id: number,
    name: string,
    price: number,
    description: string,
    ingredients: Ingredient[]
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.ingredients = ingredients;
  }

  getID(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getDescription(): string {
    return this.description;
  }

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }
}

class Ingredient implements Ingredient {
  name: string;
  quantity: number;
  unit: string;

  constructor(name: string, quantity: number, unit: string) {
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
  }

  getName(): string {
    return this.name;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getUnit(): string {
    return this.unit;
  }
}

export { Ingredient, Product };
