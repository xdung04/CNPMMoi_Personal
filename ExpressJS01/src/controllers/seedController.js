import Category from "../models/category.js";
import Product from "../models/product.js";

export const seedData = async (req, res) => {
  try {
    // Xóa dữ liệu cũ
    await Category.deleteMany();
    await Product.deleteMany();

    // Tạo categories
    const categories = await Category.insertMany([
      { name: "Shoes" },
      { name: "Clothes" },
      { name: "Accessories" },
    ]);

    // Tạo products demo (20 sp)
    const products = await Product.insertMany([
      // Shoes
      {
        name: "Nike Air",
        price: 120,
        image: "https://via.placeholder.com/200x200.png?text=Nike+Air",
        category: categories[0]._id,
      },
      {
        name: "Adidas Pro",
        price: 150,
        image: "https://via.placeholder.com/200x200.png?text=Adidas+Pro",
        category: categories[0]._id,
      },
      {
        name: "Puma Runner",
        price: 95,
        image: "https://via.placeholder.com/200x200.png?text=Puma+Runner",
        category: categories[0]._id,
      },
      {
        name: "Converse Classic",
        price: 80,
        image: "https://via.placeholder.com/200x200.png?text=Converse",
        category: categories[0]._id,
      },
      {
        name: "Vans Old Skool",
        price: 85,
        image: "https://via.placeholder.com/200x200.png?text=Vans",
        category: categories[0]._id,
      },

      // Clothes
      {
        name: "T-shirt Basic",
        price: 25,
        image: "https://via.placeholder.com/200x200.png?text=T-shirt",
        category: categories[1]._id,
      },
      {
        name: "Hoodie Warm",
        price: 60,
        image: "https://via.placeholder.com/200x200.png?text=Hoodie",
        category: categories[1]._id,
      },
      {
        name: "Jeans Slim",
        price: 45,
        image: "https://via.placeholder.com/200x200.png?text=Jeans",
        category: categories[1]._id,
      },
      {
        name: "Jacket Windbreaker",
        price: 70,
        image: "https://via.placeholder.com/200x200.png?text=Jacket",
        category: categories[1]._id,
      },
      {
        name: "Sweater Cozy",
        price: 55,
        image: "https://via.placeholder.com/200x200.png?text=Sweater",
        category: categories[1]._id,
      },

      // Accessories
      {
        name: "Cap Cool",
        price: 15,
        image: "https://via.placeholder.com/200x200.png?text=Cap",
        category: categories[2]._id,
      },
      {
        name: "Backpack Trendy",
        price: 40,
        image: "https://via.placeholder.com/200x200.png?text=Backpack",
        category: categories[2]._id,
      },
      {
        name: "Sunglasses Classic",
        price: 30,
        image: "https://via.placeholder.com/200x200.png?text=Sunglasses",
        category: categories[2]._id,
      },
      {
        name: "Watch Sport",
        price: 90,
        image: "https://via.placeholder.com/200x200.png?text=Watch",
        category: categories[2]._id,
      },
      {
        name: "Wallet Leather",
        price: 50,
        image: "https://via.placeholder.com/200x200.png?text=Wallet",
        category: categories[2]._id,
      },
      {
        name: "Scarf Warm",
        price: 20,
        image: "https://via.placeholder.com/200x200.png?text=Scarf",
        category: categories[2]._id,
      },
      {
        name: "Belt Classic",
        price: 35,
        image: "https://via.placeholder.com/200x200.png?text=Belt",
        category: categories[2]._id,
      },
      {
        name: "Gloves Winter",
        price: 25,
        image: "https://via.placeholder.com/200x200.png?text=Gloves",
        category: categories[2]._id,
      },
      {
        name: "Necklace Silver",
        price: 75,
        image: "https://via.placeholder.com/200x200.png?text=Necklace",
        category: categories[2]._id,
      },
    ]);

    res.json({ categories, products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
