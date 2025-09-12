import { getProducts } from "../services/productService.js";
import esClient from "../esClient/esClient.js";
export const listProducts = async (req, res) => {
  try {
    const { categoryId, page, limit } = req.query;
    const result = await getProducts(categoryId, parseInt(page) || 1, parseInt(limit) || 10);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const searchProducts = async (req, res) => {
  try {
    const { q, categoryId, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    const must = [];
    const filter = [];

    // Fuzzy search theo tên sản phẩm
    if (q) {
      must.push({
        fuzzy: {
          name: {
            value: q,
            fuzziness: "AUTO", // cho phép sai chính tả gần giống
          },
        },
      });
    }

    // Lọc theo category
    if (categoryId) {
      filter.push({ term: { category: categoryId } });
    }

    // Lọc theo giá
    if (minPrice || maxPrice) {
      filter.push({
        range: {
          price: {
            gte: minPrice ? Number(minPrice) : undefined,
            lte: maxPrice ? Number(maxPrice) : undefined,
          },
        },
      });
    }

    const from = (page - 1) * limit;

    const result = await esClient.search({
      index: "products",
      from,
      size: limit,
      query: {
        bool: {
          must,
          filter,
        },
      },
    });

    const products = result.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }));

    res.json({
      products,
      total: result.hits.total.value,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
