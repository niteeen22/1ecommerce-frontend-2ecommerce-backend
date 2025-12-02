import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product,setProduct] = useState({});

  const fetchProduct = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/admin/all-products`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("adminToken") }
    });
    const p = data.products.find(p=>p._id===id);
    setProduct(p);
  };

  useEffect(()=>{ fetchProduct(); },[id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/admin/product/${id}`, product, {
      headers: { Authorization: "Bearer " + localStorage.getItem("adminToken") }
    });
    navigate("/admin/products");
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <input value={product.name || ""} onChange={e=>setProduct({...product,name:e.target.value})} />
        <input type="number" value={product.price || ""} onChange={e=>setProduct({...product,price:e.target.value})} />
        <input value={product.category || ""} onChange={e=>setProduct({...product,category:e.target.value})} />
        <input value={product.brand || ""} onChange={e=>setProduct({...product,brand:e.target.value})} />
        <textarea value={product.description || ""} onChange={e=>setProduct({...product,description:e.target.value})} />
        <button type="submit">Update
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
