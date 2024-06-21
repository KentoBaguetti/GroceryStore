import { Router } from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} from "./productController";
import authMiddleware from "../auth/authMiddleware";

const router = Router();

router.post("/products", authMiddleware, addProduct);
router.get("/products", authMiddleware, getProducts);
router.get("/products/:id", authMiddleware, getProductById);
router.get(
  "/products/category/:category",
  authMiddleware,
  getProductsByCategory
);
router.put("/products/:id", authMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, deleteProduct);

export default router;
