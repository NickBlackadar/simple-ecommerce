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

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let emptyFields = [];

  if (!email) {
    emptyFields.push("email");
  }

  if (!password) {
    emptyFields.push("password");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Please fill in all fields", emptyFields });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 symbol, and 1 number",
    });
  }

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "User with that email already exists" });
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

  let emptyFields: string[] = [];

  if (!email) {
    emptyFields.push("email");
  }

  if (!password) {
    emptyFields.push("password");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Please fill in all fields", emptyFields });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Please enter a valid email" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = createToken(user.id);
    res.status(200).json({ email, token });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};
