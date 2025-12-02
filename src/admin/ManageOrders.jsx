import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Toaster} from 'react-hot-toast'

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const { data } = await axios.get(
        "http://localhost:5000/api/orders/all-orders",
        { headers: { Authorization: "Bearer " + token } }
      );
      setOrders(data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>User</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Items</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.user?.name || o.user?.email || "Unknown"}</td>
                <td>₹{o.totalAmount}</td>
                <td>{o.status}</td>
                <td>
                  {o.items.map((i, idx) => (
                    <div key={idx}>
                      {i.name || i.product?.name} × {i.qty}
                    </div>
                  ))}
                </td>
                <td>
                  <Link to={`/admin/orders/edit/${o._id}`}>Edit
                  <Toaster/>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageOrders;
