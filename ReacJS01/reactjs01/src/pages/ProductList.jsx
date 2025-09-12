import { useEffect, useState, useRef, useCallback } from "react";
import productApi from "../api/productApi";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const debounceRef = useRef(null);

  // 🟢 Lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await productApi.getCategories();
        setCategories(res.data || []);
      } catch (err) {
        console.error("Fetch categories error:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🟢 Lấy sản phẩm
  // trong fetchProducts:
const fetchProducts = useCallback(async () => {
  if (loading || !hasMore) return;
  setLoading(true);

  try {
    // Chuẩn hóa filter
    const query = {
      q: search?.trim() || undefined,
      categoryId: categoryId || undefined,
      minPrice: priceMin !== "" ? Number(priceMin) : undefined,
      maxPrice: priceMax !== "" ? Number(priceMax) : undefined,
      page,
      limit: 6,
    };

    let res;
    // Nếu có ít nhất một filter hợp lệ thì search
    if (query.q || query.categoryId || query.minPrice || query.maxPrice) {
      res = await productApi.search(query);
    } else {
      // không có filter nào => lấy tất cả
      res = await productApi.getProducts({ page, limit: 6 });
    }

    setProducts((prev) => {
      const newItems = res.data.products.filter(
        (p) => !prev.some((old) => (old._id || old.id) === (p._id || p.id))
      );
      const updated = [...prev, ...newItems];

      if (updated.length >= res.data.total) {
        setHasMore(false);
      }
      return updated;
    });

    console.log("📦 Fetch page:", page,
      "Got:", res.data.products.length,
      "Total:", res.data.total
    );
  } catch (err) {
    console.error("Fetch products error:", err);
  } finally {
    setLoading(false);
  }
}, [categoryId, search, priceMin, priceMax, page, loading, hasMore]);


  // Reset khi đổi filter/search
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [categoryId, search, priceMin, priceMax]);

  // Load khi page thay đổi
  useEffect(() => {
    if (page === 1 && products.length > 0) return;
    fetchProducts();
  }, [page, fetchProducts]);

  // Lazy load
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          console.log("👀 Observer triggered, preparing to load page:", page + 1);

          if (debounceRef.current) clearTimeout(debounceRef.current);

          debounceRef.current = setTimeout(() => {
            setPage((prev) => prev + 1);
          }, 800);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page]
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Products</h2>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg flex-1"
        />

        {/* Category */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Price filter */}
        <input
          type="number"
          placeholder="Min Price"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          className="p-2 border rounded-lg w-28"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          className="p-2 border rounded-lg w-28"
        />
      </div>

      {/* Grid sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p, index) => {
          const isLast = products.length === index + 1;
          return (
            <div
              ref={isLast ? lastProductRef : null}
              key={p._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-gray-600">${p.price}</p>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <p className="mt-4 text-center text-gray-500">Loading...</p>}
      {!hasMore && !loading && (
        <p className="mt-4 text-center text-gray-500">No more products</p>
      )}
    </div>
  );
}

export default ProductList;
