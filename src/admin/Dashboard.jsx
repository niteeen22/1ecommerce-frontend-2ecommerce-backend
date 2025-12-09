import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, users: 0, orders: 0 });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const { data: productData } = await axios.get(
        "http://localhost:5000/api/admin/all-products",
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log("Products:", productData);

      const { data: userData } = await axios.get(
        "http://localhost:5000/api/admin/all-users",
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log("Users:", userData);

      const { data: orderData } = await axios.get(
        "http://localhost:5000/api/orders/all-orders",
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log("Orders:", orderData);

      setStats({
        products: productData?.data?.length || 0,
        users: userData?.data?.length || 0,
        orders: orderData?.orders?.length || 0,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>
      {/* <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}> */}
      <div className="admin-Dashboard">
        {/* <div className="admin-margin" style={{ background: "#f2f2f2", padding: "20px", borderRadius: "10px", flex: 1 }}> */}
        <div
          style={{
            background: "#f2f2f2",
            padding: "20px",
            borderRadius: "10px",
            flex: 1,
            margin: "10px",
          }}
        >
          <h2>Total Products</h2>
          <p style={{ fontSize: "24px" }}>{stats.products}</p>
          <Link to="/admin/products">Manage Products</Link>
        </div>
        <div
          style={{
            background: "#f2f2f2",
            padding: "20px",
            borderRadius: "10px",
            flex: 1,
            margin: "10px",
            margin: "10px",
          }}
        >
          <h2>Total Users</h2>
          <p style={{ fontSize: "24px" }}>{stats.users}</p>
          <Link to="/admin/users">Manage Users</Link>
        </div>
        <div
          style={{
            background: "#f2f2f2",
            padding: "20px",
            borderRadius: "10px",
            flex: 1,
            margin: "10px",
          }}
        >
          <h2>Total Orders</h2>
          <p style={{ fontSize: "24px" }}>{stats.orders}</p>
          <Link to="/admin/orders">View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
