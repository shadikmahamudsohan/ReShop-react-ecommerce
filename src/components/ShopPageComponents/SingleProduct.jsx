import React from "react";
import "./SingleProduct.css";
import { useNavigate } from "react-router-dom";
const SingleProduct = ({ data }) => {
  const { image, name, description, price, sold } = data;
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img
        src={`${process.env.REACT_APP_serverApi}${image}`}
        alt={name}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        <p className="product-description">{description}</p>
        <p className="product-price">Price: ${price}</p>
        <p className="product-sold">Sold: {sold}</p>
        <br />
        <button onClick={() => navigate(`/product/${data._id}`)}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
