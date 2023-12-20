import Product from "../models/productModel";
import { Request, Response } from "express";
import { Error } from "mongoose";

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

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ message: err.message });
    }
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, category, description, imageUrl } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }

  if (!price) {
    emptyFields.push("price");
  }

  if (!category) {
    emptyFields.push("category");
  }

  if (!description) {
    emptyFields.push("description");
  }

  if (!imageUrl) {
    emptyFields.push("imageUrl");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Please fill in all fields", emptyFields });
  }

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
