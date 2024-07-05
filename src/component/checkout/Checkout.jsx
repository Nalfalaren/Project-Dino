import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "../navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import Success from "../successMessage/Success";
import "../checkout/Checkout.scss";

const Checkout = () => {
  const location = useLocation();
  const newListCart = location.state.newListCart;
  const totalPrice = location.state.totalPrice;

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    cardHolder: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);

  const handleSent = () => {
    setIsSent(false);
  };

  const schema = z.object({
    firstName: z.string().nonempty('Enter the first name!'),
    lastName: z.string().nonempty('Enter the last name!'),
    phoneNumber: z.string().nonempty('Enter the phone number!').regex(/^\d+$/, 'Enter a valid phone number!'),
    address: z.string().nonempty('Enter the address!'),
    cardHolder: z.string().nonempty('Enter the cardholder name!'),
    cardNumber: z.string().nonempty('Enter the card number!').regex(/^\d+$/, 'Enter a valid card number!'),
    expirationDate: z.string().nonempty('Enter the expiration date!'),
    cvv: z.string().nonempty('Enter the CVV!').regex(/^\d+$/, 'Enter a valid CVV!'),
  });

  const handleUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      schema.parse(userData);
      setErrors({});
      const url = `https://testapi.io/api/dinomerch/resource/payment`;
      await axios.post(url, {
        ...userData,
        numberOfItems: newListCart.length,
        orderTotal: totalPrice.toString(),
      });
      setIsSent(true);
      setUserData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        cardHolder: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
      });
    } catch (err) {
      if (err.errors) {
        const newErrors = err.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="checkout-page">
      <Navbar />
      <div className="checkout">
        <div className="product-link">
          <ArrowBackIcon />
          <Link to={"/"} className="link">
            Back to Homepage
          </Link>
        </div>
        <div className="checkout-info">
          <form onSubmit={handleSubmit}>
            <div className="checkout-wrapper">
              <div className="checkout-left">
                <h1>Shipping Address</h1>
                <div className="checkout-name">
                  <div className="checkout-firstname">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleUserData}
                    />
                    {errors.firstName && <span className="checkout-error">{errors.firstName}</span>}
                  </div>
                  <div className="checkout-lastname">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleUserData}
                    />
                    {errors.lastName && <span className="checkout-error">{errors.lastName}</span>}
                  </div>
                </div>
                <div className="checkout-phonenumber">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleUserData}
                  />
                  {errors.phoneNumber && <span className="checkout-error">{errors.phoneNumber}</span>}
                </div>
                <div className="checkout-address">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleUserData}
                  />
                  {errors.address && <span className="checkout-error">{errors.address}</span>}
                </div>
              </div>
              <div className="checkout-right">
                <h1>Payment Details</h1>
                <div className="payment-card">
                  <img src="./assets/card.png" alt="Card" />
                  <span className="card-name">Visa/Mastercard</span>
                </div>
                <div className="payment-cardholder">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={userData.cardHolder}
                    onChange={handleUserData}
                  />
                  {errors.cardHolder && <span className="checkout-error">{errors.cardHolder}</span>}
                </div>
                <div className="payment-number">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={userData.cardNumber}
                    onChange={handleUserData}
                  />
                  {errors.cardNumber && <span className="checkout-error">{errors.cardNumber}</span>}
                </div>
                <div className="payment-subinfo">
                  <div className="payment-date">
                    <label>Expiration Date</label>
                    <input
                      type="text"
                      name="expirationDate"
                      value={userData.expirationDate}
                      onChange={handleUserData}
                    />
                    {errors.expirationDate && <span className="checkout-error">{errors.expirationDate}</span>}
                  </div>
                  <div className="payment-cvv">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={userData.cvv}
                      onChange={handleUserData}
                    />
                    {errors.cvv && <span className="checkout-error">{errors.cvv}</span>}
                  </div>
                </div>
              </div>
            </div>
            <button className="order-button">Confirm order</button>
          </form>
        </div>
      </div>
      <div className="order">
        <div className="order-detail">
          <h1>Order Details</h1>
          <div className="order-wrapper" style={{ backgroundColor: "#F3F3F3" }}>
            {newListCart.map((item, index) => (
              <div className="order-box" key={index}>
                <img src={item.img} alt={item.name} />
                <div className="order-info">
                  <p className="order-name">{item.name}</p>
                  <p>
                    Price:<span>${item.price.toFixed(2)}</span>
                  </p>
                  <p>
                    Quantity:<span>{item.count}</span>
                  </p>
                </div>
                <span className="item-total">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="order-summary">
          <h1>Order Summary</h1>
          <div className="order-item">
            <div className="order-quantity">
              <span>Items ({newListCart.length})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="order-shipment">
              <span>Shipment Cost:</span>
              <span>$6.50</span>
            </div>
            <div className="order-tax">
              <span>Tax collected:</span>
              <span>$0.80</span>
            </div>
          </div>
          <hr />
          <div className="order-total">
            <span>Order total: </span>
            <span>${(totalPrice + 6.5 + 0.8).toFixed(2)}</span>
          </div>
        </div>
      </div>
      {isSent && (
        <Success
          isSent={isSent}
          setIsSent={setIsSent}
          handleSent={handleSent}
          totalPrice={totalPrice}
        />
      )}
    </div>
  );
};

export default Checkout;
