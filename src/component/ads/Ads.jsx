import React from "react";
import { Link as ScrollLink } from "react-scroll";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import "../ads/Ads.scss";
const Ads = () => {
  return (
    <div className="ads-block">
      <div className="ads-content">
        <div className="ads-title">
          <h1>Shop the Look: dinomerch</h1>
          <h1>- Define Your Style</h1>
        </div>
        <div className="ads-para">
          <p>Elevate Your Wardrobe with</p>
          <p>Exclusive merch</p>
        </div>
        <ScrollLink
          to="Product"
          smooth={true}
          duration={1000}
          className="ads-scroll"
        >
          <div className="ads-button">
            <p>Scroll down for more</p>
            <SouthOutlinedIcon className="arrow"></SouthOutlinedIcon>
          </div>
        </ScrollLink>
      </div>
      <div className="ads-img">
        <img src="./Vector.png" alt="img" className="ads-icon"></img>
      </div>
    </div>
  );
};

export default Ads;
