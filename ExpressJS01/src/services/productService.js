import Product from "../models/product.js";

// Lấy danh sách sản phẩm theo category + phân trang
export const getProducts = async (categoryId, page = 1, limit = 10) => {
  const query = categoryId ? { category: categoryId } : {};
  const products = await Product.find(query)
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit);
  const total = await Product.countDocuments(query);
  return { products, total };
};

export const createProduct = async (data) => {
  const product = await Product.create(data);

  // Index vào Elasticsearch
  await esClient.index({
    index: "products",
    id: product._id.toString(),
    document: {
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category.toString(),
    },
  });

  return product;
};