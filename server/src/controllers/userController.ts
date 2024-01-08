import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";

const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

type ResponseError = {
  field: string;
  message: string;
};

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let emptyFields: ResponseError[] = [];

  if (!email) {
    emptyFields.push({ field: "email", message: "Email is required" });
  }

  if (!password) {
    emptyFields.push({ field: "password", message: "Password is required" });
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ emptyFields });
  }

  if (!validator.isEmail(email)) {
    emptyFields.push({ field: "email", message: "Please enter a valid email" });
    return res.status(400).json({ emptyFields });
  }

  if (!validator.isStrongPassword(password)) {
    emptyFields.push({
      field: "password",
      message:
        "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 symbol, and 1 number",
    });
    return res.status(400).json({ emptyFields });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      emptyFields.push({ field: "email", message: "User already exists" });
      return res.status(400).json({ emptyFields });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword });

    const token = createToken(user.id);

    res.status(200).json({ email, token });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as Record<string, string>;

  let emptyFields: ResponseError[] = [];

  if (!email) {
    emptyFields.push({ field: "email", message: "Email is required" });
  }

  if (!password) {
    emptyFields.push({ field: "password", message: "Password is required" });
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ emptyFields });
  }

  if (!validator.isEmail(email)) {
    emptyFields.push({ field: "email", message: "Please enter a valid email" });
    return res.status(400).json({ emptyFields });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      emptyFields.push({ field: "email", message: "User does not exist" });
      return res.status(400).json({ emptyFields });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      emptyFields.push({ field: "password", message: "Incorrect password" });
      return res.status(400).json({ emptyFields });
    }
    const token = createToken(user.id);
    res.status(200).json({ email, token });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};
