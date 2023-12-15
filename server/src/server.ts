import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import productRoutes from "./routes/product";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/products", productRoutes);

mongoose
  .connect(process.env.MONGO_URI!, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
