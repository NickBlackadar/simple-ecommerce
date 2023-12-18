import express from "express";
import {
  getProducts,
  createProduct,
  getProduct,
} from "../controllers/productController";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", createProduct);

export default router;
