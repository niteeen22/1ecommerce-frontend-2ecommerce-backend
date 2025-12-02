import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, total, updateCart } = useContext(CartContext);
  const [address, setAddress] = useState("");

  const placeOrder = async () => {
    if (!address) {
      alert("Please enter your delivery address");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const orderData = {
        items: cart,
        totalAmount: total, // always defined now
        address,
      };

      await axios.post("http://localhost:5000/api/orders/place", orderData, {
        headers: { Authorization: "Bearer " + token },
      });

      updateCart([]);  
      localStorage.removeItem("cart");
      navigate("/my-orders");
    } catch (error) {
      console.error("Order error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <label>Delivery Address</label>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your full address"
      />

      <h3>Order Summary</h3>
      <p>Total Items: {cart.length}</p>
      <p>Total Amount: ₹{total}</p>

      <button onClick={placeOrder}>Confirm Order</button>
      <button onClick={() => navigate("/payment", { state: { address } })} style={{margin:"10px"}}>
  Proceed to Payment
</button>

    </div>
  );
};

export default Checkout;
