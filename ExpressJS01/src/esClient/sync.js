import mongoose from "mongoose";
import Product from "../models/product.js";
import esClient from "./esClient.js";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/fullstack01";

const syncProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // lấy tất cả sản phẩm từ MongoDB
    const products = await Product.find().lean();

    for (const p of products) {
      await esClient.index({
        index: "products",
        id: p._id.toString(),
        document: {
          name: p.name,
          price: p.price,
          image: p.image,
          category: p.category.toString(),
        },
      });
    }

    console.log("🌱 Synced products to Elasticsearch:", products.length);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

syncProducts();
