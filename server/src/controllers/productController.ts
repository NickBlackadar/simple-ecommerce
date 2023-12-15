import Product from "../models/productModel";
import { Request, Response } from "express";
import mongoose, { Error } from "mongoose";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ message: err.message });
    }
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, category, description, imageUrl } = req.body;
  try {
    const product = await Product.create({
      name,
      price,
      category,
      description,
      imageUrl,
    });
    res.status(200).json(product);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
};
