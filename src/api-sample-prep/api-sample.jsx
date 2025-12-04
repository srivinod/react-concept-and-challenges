import React, { useEffect, useState, useMemo } from "react";

const ApiSample = () => {
  const apiURL = "https://dummyjson.com/products";
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter state
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const getProducts = await fetch(apiURL);
      if (!getProducts.ok) throw new Error(`HTTP ${getProducts.status}`);
      const getproductList = await getProducts.json();
      setAllProducts(Array.isArray(getproductList.products) ? getproductList.products : []);
    } catch (err) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [apiURL]);

  // derive categories for dropdown
  const categories = useMemo(() => {
    const setCat = new Set();
    allProducts.forEach((p) => setCat.add(p.category));
    return ["all", ...Array.from(setCat)];
  }, [allProducts]);

  // filtered products
  const filtered = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return allProducts.filter((p) => {
      if (!p) return false;

      // search
      if (q) {
        const hay = `${p.title} ${p.brand ?? ""} ${p.description ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      // category
      if (category !== "all" && p.category !== category) return false;

      // price
      const price = Number(p.price ?? 0);
      if (minPrice !== "" && !Number.isNaN(Number(minPrice)) && price < Number(minPrice))
        return false;
      if (maxPrice !== "" && !Number.isNaN(Number(maxPrice)) && price > Number(maxPrice))
        return false;

      // stock
      if (inStockOnly && Number(p.stock ?? 0) <= 0) return false;

      return true;
    });
  }, [allProducts, searchText, category, minPrice, maxPrice, inStockOnly]);

  // basic stats
  const stats = useMemo(() => {
    const total = allProducts.length;
    const shown = filtered.length;
    const percentShown = total === 0 ? 0 : ((shown / total) * 100).toFixed(1);
    return { total, shown, percentShown };
  }, [allProducts, filtered]);

  return (
    <>
      <div style={{ padding: "10px 10px" }}>
        <h3 style={{ padding: "10px 0px" }}>OVERVIEW</h3>

        <div style={{ display: "flex", gap: 12, paddingBottom: 12 }}>
          <div style={{ border: "1px solid #efefef", padding: "10px" }}>
            <h4>Shown: {stats.shown} / {stats.total}</h4>
            <div>{stats.percentShown}%</div>
          </div>

          <div style={{ border: "1px solid #efefef", padding: "10px" }}>
            <h4>Total Products : {stats.total}</h4>
          </div>

          {/* Filters (simple) */}
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
            <input
              placeholder="Search title / brand..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All categories" : c}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={{ width: 90, padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
            />
            <input
              type="number"
              placeholder="max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ width: 90, padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
            />

            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              In stock
            </label>

            <button
              onClick={() => {
                // reset filters
                setSearchText("");
                setCategory("all");
                setMinPrice("");
                setMaxPrice("");
                setInStockOnly(false);
              }}
              style={{ padding: "6px 8px", borderRadius: 4 }}
            >
              Reset
            </button>
          </div>
        </div>

        <hr />

        {loading && <p>Loading products…</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {!loading &&
          !error &&
          filtered.map((prodData) => (
            <React.Fragment key={prodData.id}>
              <div style={{ padding: "10px 10px", display: "flex", alignItems: "center" }}>
                <div style={{ padding: "10px" }}>
                  <img
                    src={prodData.thumbnail || (prodData.images && prodData.images[0]) || ""}
                    width="60"
                    alt={prodData.title}
                  />
                </div>

                <div>
                  <b>{prodData.title}</b>
                  <br />
                  Price: ${prodData.price}
                  <br />
                  Available: {prodData.stock}
                  <br />
                  <div
                    style={{
                      background: "teal",
                      border: "1px solid teal",
                      color: "#fff",
                      padding: "0 6px",
                      margin: "5px 0px",
                      width: "max-content",
                      borderRadius: 4,
                      fontSize: 12,
                    }}
                  >
                    <small>Discount: {prodData.discountPercentage}%</small>
                  </div>
                </div>
              </div>
              <hr />
            </React.Fragment>
          ))}

        {!loading && !error && filtered.length === 0 && <p>No products match filters.</p>}
      </div>
    </>
  );
};

export { ApiSample };
