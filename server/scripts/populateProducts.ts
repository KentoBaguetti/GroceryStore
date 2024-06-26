import mongoose from "mongoose";
import Product, { IProduct } from "../database/product/productModel";
import createAdditionalConnection from "../database/additionalConnection";

const products: any = [
  {
    id: 1,
    name: "Organic Fuji Apples",
    category: "Fruits",
    price: 2.99,
    description: "Sweet and crisp organic Fuji apples",
    ingredients: ["Apples"],
  },
  {
    id: 2,
    name: "Gummy Bears",
    category: "Candy",
    price: 1.99,
    description: "Colorful and chewy gummy bears",
    ingredients: ["Sugar", "Gelatin", "Corn syrup"],
  },
  {
    id: 3,
    name: "Greek Yogurt",
    category: "Dairy",
    price: 3.49,
    description: "Thick and creamy Greek yogurt",
    ingredients: ["Milk", "Yogurt cultures"],
  },
  {
    id: 4,
    name: "Pineapple Slices",
    category: "Fruits",
    price: 3.79,
    description: "Juicy pineapple slices in natural juice",
    ingredients: ["Pineapple", "Pineapple juice"],
  },
  {
    id: 5,
    name: "Dark Chocolate Bar",
    category: "Candy",
    price: 3.79,
    description: "Rich and indulgent dark chocolate bar",
    ingredients: ["Cocoa beans", "Sugar", "Cocoa butter"],
  },
  {
    id: 6,
    name: "Blueberry Muffins",
    category: "Bakery",
    price: 2.49,
    description: "Moist blueberry muffins made fresh daily",
    ingredients: ["Flour", "Blueberries", "Sugar", "Butter"],
  },
  {
    id: 7,
    name: "Parmesan Cheese",
    category: "Dairy",
    price: 5.99,
    description: "Aged Parmesan cheese, perfect for grating",
    ingredients: ["Milk", "Salt", "Enzymes"],
  },
  {
    id: 8,
    name: "Salmon Fillet",
    category: "Seafood",
    price: 9.99,
    description: "Fresh Atlantic salmon fillet, boneless and skinless",
    ingredients: ["Salmon"],
  },
  {
    id: 9,
    name: "Granola Bars",
    category: "Snacks",
    price: 4.49,
    description: "Nutritious granola bars with oats and honey",
    ingredients: ["Oats", "Honey", "Nuts", "Seeds"],
  },
  {
    id: 10,
    name: "Green Tea",
    category: "Beverages",
    price: 3.29,
    description: "Premium green tea leaves, loose leaf",
    ingredients: ["Green tea leaves"],
  },
  {
    id: 11,
    name: "Whole Wheat Bread",
    category: "Bakery",
    price: 3.99,
    description: "Healthy whole wheat bread, freshly baked",
    ingredients: ["Whole wheat flour", "Water", "Yeast"],
  },
  {
    id: 12,
    name: "Mixed Nuts",
    category: "Snacks",
    price: 6.99,
    description: "Assorted mixed nuts with almonds, cashews, and peanuts",
    ingredients: ["Almonds", "Cashews", "Peanuts"],
  },
  {
    id: 13,
    name: "Vanilla Ice Cream",
    category: "Dairy",
    price: 4.99,
    description: "Creamy vanilla ice cream made with real vanilla beans",
    ingredients: ["Milk", "Cream", "Sugar", "Vanilla beans"],
  },
  {
    id: 14,
    name: "Cheddar Cheese",
    category: "Dairy",
    price: 4.49,
    description: "Sharp cheddar cheese, perfect for slicing",
    ingredients: ["Milk", "Salt", "Enzymes"],
  },
  {
    id: 15,
    name: "Pasta Sauce",
    category: "Pantry",
    price: 2.79,
    description: "Classic tomato pasta sauce with herbs and spices",
    ingredients: ["Tomatoes", "Garlic", "Onions", "Herbs"],
  },
];

// Function to save products to MongoDB using Mongoose
async function saveProductsToDatabase() {
  try {
    // Clear existing products
    await Product.deleteMany({});

    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`${insertedProducts.length} products inserted successfully.`);
  } catch (error) {
    console.error("Error saving products:", error);
  }
}

// Uncomment and call the function to save products to the database
// saveProductsToDatabase();

/**
 JSON of the data as well
  [
  {
    "id": 1,
    "name": "Organic Fuji Apples",
    "category": "Fruits",
    "price": 2.99,
    "description": "Sweet and crisp organic Fuji apples",
    "ingredients": ["Apples"]
  },
  {
    "id": 2,
    "name": "Gummy Bears",
    "category": "Candy",
    "price": 1.99,
    "description": "Colorful and chewy gummy bears",
    "ingredients": ["Sugar", "Gelatin", "Corn syrup"]
  },
  {
    "id": 3,
    "name": "Greek Yogurt",
    "category": "Dairy",
    "price": 3.49,
    "description": "Thick and creamy Greek yogurt",
    "ingredients": ["Milk", "Yogurt cultures"]
  },
  {
    "id": 4,
    "name": "Pineapple Slices",
    "category": "Fruits",
    "price": 3.79,
    "description": "Juicy pineapple slices in natural juice",
    "ingredients": ["Pineapple", "Pineapple juice"]
  },
  {
    "id": 5,
    "name": "Dark Chocolate Bar",
    "category": "Candy",
    "price": 3.79,
    "description": "Rich and indulgent dark chocolate bar",
    "ingredients": ["Cocoa beans", "Sugar", "Cocoa butter"]
  },
  {
    "id": 6,
    "name": "Blueberry Muffins",
    "category": "Bakery",
    "price": 2.49,
    "description": "Moist blueberry muffins made fresh daily",
    "ingredients": ["Flour", "Blueberries", "Sugar", "Butter"]
  },
  {
    "id": 7,
    "name": "Parmesan Cheese",
    "category": "Dairy",
    "price": 5.99,
    "description": "Aged Parmesan cheese, perfect for grating",
    "ingredients": ["Milk", "Salt", "Enzymes"]
  },
  {
    "id": 8,
    "name": "Salmon Fillet",
    "category": "Seafood",
    "price": 9.99,
    "description": "Fresh Atlantic salmon fillet, boneless and skinless",
    "ingredients": ["Salmon"]
  },
  {
    "id": 9,
    "name": "Granola Bars",
    "category": "Snacks",
    "price": 4.49,
    "description": "Nutritious granola bars with oats and honey",
    "ingredients": ["Oats", "Honey", "Nuts", "Seeds"]
  },
  {
    "id": 10,
    "name": "Green Tea",
    "category": "Beverages",
    "price": 3.29,
    "description": "Premium green tea leaves, loose leaf",
    "ingredients": ["Green tea leaves"]
  },
  {
    "id": 11,
    "name": "Whole Wheat Bread",
    "category": "Bakery",
    "price": 3.99,
    "description": "Healthy whole wheat bread, freshly baked",
    "ingredients": ["Whole wheat flour", "Water", "Yeast"]
  },
  {
    "id": 12,
    "name": "Mixed Nuts",
    "category": "Snacks",
    "price": 6.99,
    "description": "Assorted mixed nuts with almonds, cashews, and peanuts",
    "ingredients": ["Almonds", "Cashews", "Peanuts"]
  },
  {
    "id": 13,
    "name": "Vanilla Ice Cream",
    "category": "Dairy",
    "price": 4.99,
    "description": "Creamy vanilla ice cream made with real vanilla beans",
    "ingredients": ["Milk", "Cream", "Sugar", "Vanilla beans"]
  },
  {
    "id": 14,
    "name": "Cheddar Cheese",
    "category": "Dairy",
    "price": 4.49,
    "description": "Sharp cheddar cheese, perfect for slicing",
    "ingredients": ["Milk", "Salt", "Enzymes"]
  },
  {
    "id": 15,
    "name": "Pasta Sauce",
    "category": "Pantry",
    "price": 2.79,
    "description": "Classic tomato pasta sauce with herbs and spices",
    "ingredients": ["Tomatoes", "Garlic", "Onions", "Herbs"]
  }
]

 * 
 */
