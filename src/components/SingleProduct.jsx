import React from "react";
import { useNavigate } from "react-router-dom";
const SingleProduct = ({ data }) => {
  const { image, name, description, price, sold } = data;
  const navigate = useNavigate();

  return (
    <div className="">
      <img
        src={`${process.env.REACT_APP_serverApi}${image}`}
        alt={name}
        className=""
      />
      <div className="">
        <h3 className="">{name}</h3>
        <p className="">{description}</p>
        <p className="">Price: ${price}</p>
        <p className="">Sold: {sold}</p>
        <br />
        <button onClick={() => navigate(`/product/${data._id}`)}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
