import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
        console.log("TOKEN:", token);
      const { data } = await axios.get("http://localhost:5000/api/orders/my-orders", {
        headers: { Authorization: "Bearer " + token }
        
      });
    

      setOrders(data.orders);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>

{orders.map(order => (
  <div key={order._id} style={{ marginBottom: "20px" }}>
    <h3>Order ID: {order._id}</h3>
    <p>Status: {order.status}</p>
    <p>Total: ${order.totalAmount}</p>
    <p>Address: {order.address}</p>

    {order.items.map((item, index) => (
      <p key={item.productId || index}>
        {item.name} — {item.qty} × ₹{item.price}
      </p>
    ))}

    <hr />
  </div>
))}

    </div>
  );
};

export default MyOrders;
