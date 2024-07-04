import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "../navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import * as yup from "yup";
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
  const [isSent, setIsSent] = useState(false);
  const handleSent = () => {
    setIsSent(false);
  };
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.number().required(),
    address: yup.string().required(),
    cardName: yup.string().required(),
    cardNumber: yup.number().required(),
    expDate: yup.number().required(),
    cvv: yup.number().required(),
    numberOfItems: yup.number().required(),
    orderTotal: yup.string().required(),
  });

  const handleUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = schema.isValidSync(userData);
    if (!isValid) {
      console.log("Wrong input!");
    }
    const url = `https://testapi.io/api/dinomerch/resource/payment`;
    axios
      .post(url, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phoneNumber,
        address: userData.address,
        cardName: userData.cardHolder,
        cardNumber: userData.cardNumber,
        expDate: userData.expirationDate,
        cvv: userData.cvv,
        numberOfItems: newListCart.length,
        orderTotal: totalPrice.toString(),
      })
      .then((response) => {
        setIsSent(true);
      })
      .catch((err) => {
      });
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
  };

  return (
    <div className="checkout-page">
      <Navbar></Navbar>
      <div className="checkout">
        <div className="product-link">
          <ArrowBackIcon></ArrowBackIcon>
          <Link to={"/"} className="link">
            Back to Hompage
          </Link>
        </div>
        <div className="checkout-info">
          <form action="/payment" method="POST" onSubmit={handleSubmit}>
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
                    ></input>
                  </div>
                  <div className="checkout-lastname">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleUserData}
                    ></input>
                  </div>
                </div>
                <div className="checkout-phonenumber">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={userData.phoneNumber}
                    onChange={handleUserData}
                  ></input>
                </div>
                <div className="checkout-address">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleUserData}
                  ></input>
                </div>
              </div>
              <div className="checkout-right">
                <h1>Payment Details</h1>
                <div className="payment-card">
                  <img src="./assets/card.png" alt="img"></img>
                  <span className="card-name">Visa/Mastercard</span>
                </div>
                <div className="payment-cardholder">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={userData.cardHolder}
                    onChange={handleUserData}
                  ></input>
                </div>
                <div className="payment-number">
                  <label>Card number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={userData.cardNumber}
                    onChange={handleUserData}
                  ></input>
                </div>
                <div className="payment-subinfo">
                  <div className="payment-date">
                    <label>Expiration Date</label>
                    <input
                      type="text"
                      name="expirationDate"
                      value={userData.expirationDate}
                      onChange={handleUserData}
                    ></input>
                  </div>
                  <div className="payment-cvv">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={userData.cvv}
                      onChange={handleUserData}
                    ></input>
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
                <img src={item.img} alt="img"></img>
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
          <hr></hr>
          <div className="order-total">
            <span>Order total: </span>
            <span>${(totalPrice + 6.5 + 0.8).toFixed(2)}$</span>
          </div>
        </div>
      </div>
      {isSent && (
        <Success
          isSent={isSent}
          setIsSent={setIsSent}
          handleSent={handleSent}
          totalPrice={totalPrice}
        ></Success>
      )}
    </div>
  );
};

export default Checkout;
