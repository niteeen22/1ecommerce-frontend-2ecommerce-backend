import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      console.log("PRODUCT LIST:", res.data);
      setProducts(res.data.products || res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {loading ? (
          // Skeleton Loader Cards
          Array(35)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="product-card">
                <Skeleton height={180} />
                <Skeleton height={20} style={{ marginTop: 8 }} />
                <Skeleton width={80} height={20} />
              </div>
            ))
        ) : products.length ? (
          products.map((item) => (
            <Link
              key={item._id}
              to={`/product/${item._id}`}
              className="product-card"
            >
              <img
                src={item.images?.[0] || item.image || "/no-image.png"}
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </Link>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
