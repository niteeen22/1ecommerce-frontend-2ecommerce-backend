import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/api/admin/all-products", {
      headers: { Authorization: "Bearer " + localStorage.getItem("adminToken") }
    });
    setProducts(data.products);
  };

  const deleteProduct = async (id) => {
    if(window.confirm("Are you sure to delete?")){
      await axios.delete(`http://localhost:5000/api/admin/product/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("adminToken") }
      });
      fetchProducts();
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div className="manage-products-container">
  <h1>Manage Products</h1>

  <Link to="/admin/products/add" className="add-product-btn">
    Add Product
  </Link>

<div className="table-responsive">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Image</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {products.map(p => (
        <tr key={p._id}>
          <td>{p.name}</td>
          <td>{p.price}</td>
          <td>
  <img 
    src={p.images?.[0] || p.image || "/no-image.png"} 
    alt={p.name} 
    width={80} 
  />
</td>


          <td>
            <Link to={`/admin/products/edit/${p._id}`} className="edit-btn">
              Edit
            </Link>

            <button
              onClick={() => deleteProduct(p._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
</div>

  );
};

export default ManageProducts;





