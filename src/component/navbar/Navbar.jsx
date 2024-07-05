import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "../navbar/Navbar.scss";

const Navbar = ({
  isClickWishList,
  isClickCart,
  newList,
  newListCart,
  totalPrice,
  handleClickWishList,
  handleClickCart,
  handleCart,
  handleQuantity,
  handleDeleteCart,
  handleCheckout,
}) => {
  const cartListLength = newListCart ? newListCart.length : 0;
  return (
    <nav>
      <div className="left-side">
        <div className="dino-icon">
          <img src="./dino1.png" alt="img" className="nav-img" />
        </div>
        <span className="nav-title">Dinomerch</span>
      </div>
      <div className="right-side">
        <div className="shopping">
          <div
            className="shopping-title"
            onClick={handleClickCart}
            style={isClickCart ? { color: "#EB6440" } : {}}
          >
            <ShoppingCartOutlinedIcon className="icon-img" />
            <span className="nav-title">Cart</span>
            {cartListLength > 0 ? (
              <div
                style={{
                  backgroundColor: "#EB6440",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {cartListLength}
              </div>
            ) : (
              ""
            )}
          </div>
          {isClickCart && (
            <div className="cart-wrapper">
              {newListCart.map((cart) => (
                <div key={cart.id}>
                  <div className="cart-box">
                    <img src={cart.img} alt="img"></img>
                    <span className="cart-name">{cart.name}</span>
                    <button
                      className="cart-operation"
                      onClick={() => handleQuantity("-", cart.id)}
                    >
                      -
                    </button>
                    <span className="cart-quantity">{cart.count}</span>
                    <button
                      className="cart-operation"
                      onClick={() => handleQuantity("+", cart.id)}
                    >
                      +
                    </button>
                    <span className="cart-price">
                      {(cart.count * cart.price).toFixed(2)}$
                    </span>
                    <DeleteOutlineIcon
                      className="cart-delete-icon"
                      style={{ color: "red" }}
                      onClick={() => handleDeleteCart(cart.id)}
                    ></DeleteOutlineIcon>
                  </div>
                  <div>
                    <hr
                      style={{
                        width: "90%",
                        display: "block",
                        margin: "1rem 0",
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="cart-check">
                <span className="cart-total">
                  Total price: {totalPrice.toFixed(2)}$
                </span>
                <button onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          )}
        </div>
        <div className="whilist" onClick={handleClickWishList}>
          <div
            className="whilist-title"
            style={isClickWishList ? { color: "orange" } : {}}
          >
            <FavoriteBorderOutlinedIcon className="icon-img" />
            <span>Wishlist</span>
          </div>
          {isClickWishList && (
            <div className="whilist-wrapper">
              {newList.map((product) => (
                <div key={product.id}>
                  <div className="whilist-box">
                    <img src={product.img} alt="whilist-img" />
                    <div className="whilist-info">
                      <p className="whilist-name">{product.name}</p>
                      <p
                        className="whilist-price"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        {product.price.toFixed(2)}$
                      </p>
                      <button
                        className="whilist-button"
                        onClick={() => handleCart(product.id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div>
                    <hr
                      style={{ width: "90%", display: "block", margin: "1rem" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
