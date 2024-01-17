import Product from "../models/productModel";
import { Request, Response } from "express";
import { Error } from "mongoose";

type Results = {
  next: {
    page: number;
    limit: number;
  };
  previous: {
    page: number;
    limit: number;
  };
  results: any;
};

export const getProducts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {} as Results;

  if (endIndex < (await Product.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    results.results = await Product.find().skip(startIndex).limit(limit);
    res.status(200).json(results);
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
