import React, { useEffect, useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Navbar from "../navbar/Navbar";
import Ads from "../ads/Ads";
import { useNavigate } from "react-router-dom";
import "../product/Product.scss";
const Product = () => {
  const [productData, setProductData] = useState(null);
  const [heartStates, setHeartStates] = useState({});
  const [isClickWishList, setIsClickWishList] = useState(false);
  const [isClickCart, setIsClickCart] = useState(false);
  const [newList, setNewList] = useState([]);
  const [newListCart, setNewListCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState(false);
  const [positive, setPositive] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/payment", { state: { newListCart, totalPrice } });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://dinomerch.onrender.com/api/products`
      );
      const res = await response.json();
      setProductData(res.data);
    } catch (error) {
      throw error;
    }
  };

  const handleClickWishList = () => {
    let clickCart = isClickCart;
    if (!isClickWishList) {
      clickCart = false;
      setIsClickCart(clickCart);
    }
    setIsClickWishList((prevState) => !prevState);
  };

  const handleClickCart = () => {
    let clickWishList = isClickWishList;
    if (!isClickCart) {
      clickWishList = false;
      setIsClickWishList(clickWishList);
    }
    setIsClickCart((prevState) => !prevState);
  };

  const handleHeart = (id) => {
    setHeartStates((prevStates) => {
      const newHeartStates = { ...prevStates, [id]: !prevStates[id] };
      if (newHeartStates[id]) {
        showMessageAndHide("Added to Wish List");
        setPositive(true);
      } else {
        showMessageAndHide("Removed from Wish List");
        setPositive(false);
      }
      return newHeartStates;
    });

    setProductData((prevData) => {
      const newData = [...prevData];
      const index = newData.findIndex((item) => item._id === id);
      if (index !== -1) {
        newData[index] = {
          ...newData[index],
          isWishListed: !prevData[index].isWishListed,
        };

        setNewList((prevList) => {
          if (newData[index].isWishListed) {
            if (!prevList.some((item) => item.name === newData[index].name)) {
              return [
                ...prevList,
                {
                  id: newData[index]._id,
                  img: newData[index].image,
                  name: newData[index].name,
                  price: newData[index].price,
                },
              ];
            }
          } else {
            return prevList.filter((item) => item.name !== newData[index].name);
          }
          return prevList;
        });
      }
      return newData;
    });
  };

  const handleCart = (id) => {
    setProductData((prevData) => {
      const newCartList = [...prevData];
      const index = newCartList.findIndex((item) => item._id === id);

      if (index !== -1) {
        const updatedCart = {
          id: newCartList[index]._id,
          img: newCartList[index].image,
          name: newCartList[index].name,
          price: newCartList[index].price,
          count: 1,
        };
        setNewListCart((prevList) => {
          if (!prevList.some((item) => item.id === updatedCart.id)) {
            const newTotalPrice = totalPrice + updatedCart.price;
            setTotalPrice(newTotalPrice);
            showMessageAndHide("Added to cart list");
            setPositive(true);
            return [...prevList, updatedCart];
          } else {
            return prevList;
          }
        });
      }

      return newCartList;
    });
  };

  const handleQuantity = (operation, id) => {
    setNewListCart((prevList) => {
      return prevList.map((item) => {
        if (item.id === id) {
          const updatedCount =
            operation === "+" ? item.count + 1 : Math.max(item.count - 1, 1);
          const priceDifference =
            updatedCount * item.price - item.count * item.price;
          const newTotalPrice = totalPrice + priceDifference;
          setTotalPrice(newTotalPrice);
          return {
            ...item,
            count: updatedCount,
          };
        } else {
          return item;
        }
      });
    });
  };

  const handleDeleteCart = (id) => {
    setNewListCart((prevData) => {
      const newData = [...prevData];
      const removeItem = prevData.find((item) => item.id === id);
      const newTotalPrice = totalPrice - removeItem.price * removeItem.count;
      setTotalPrice(newTotalPrice);
      showMessageAndHide("Removed from cart list");
      setPositive(false);
      return newData.filter((item) => item.id !== id);
    });
  };

  const showMessageAndHide = (message) => {
    setMessage(message);
    setMessageStatus(true);
    setTimeout(() => {
      setMessageStatus(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar
        isClickWishList={isClickWishList}
        isClickCart={isClickCart}
        newList={newList}
        newListCart={newListCart}
        totalPrice={totalPrice}
        handleClickWishList={handleClickWishList}
        handleClickCart={handleClickCart}
        handleHeart={handleHeart}
        handleCart={handleCart}
        handleQuantity={handleQuantity}
        handleDeleteCart={handleDeleteCart}
        handleCheckout={handleCheckout}
      />

      <Ads />
      {/* Product code*/}
      <div className="product" id="Product">
        <h1 className="product-title">Chrome Dino Merch</h1>
        {productData && (
          <div className="product-wrapper">
            {productData.map((product) => (
              <div className="product-box" key={product._id}>
                <div className="product-img">
                  <div className="img">
                    <div className="img-cover">
                      <img src={product.image} alt="img" />
                    </div>
                    <div
                      className="product-heart"
                      onClick={() => handleHeart(product._id)}
                    >
                      {heartStates[product._id] ? (
                        <FavoriteOutlinedIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )}
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <p className="product-name">{product.name}</p>
                  <div className="product-sub-info">
                    <p>{product.price.toFixed(2)}$</p>
                    <button
                      className="product-button"
                      onClick={() => handleCart(product._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {messageStatus && (
          <div className="product-message">
            <img
              src={
                positive === false ? "./assets/wrong.png" : "./assets/right.png"
              }
              alt="img"
              style={{ marginRight: "1rem" }}
            ></img>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};
export default Product;
