import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import { useNavigate, useParams } from "react-router-dom";
import UseGet from "../../hooks/UseGet";
const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(product);

  useEffect(() => {
    UseGet({ setData: setProduct, route: `product?_id=${id}` });
  }, [id]);

  return (
    <div className="single-product-container">
      {/* <div className="data-container"> */}
      <img
        src={`${process.env.REACT_APP_serverApi}${product[0]?.image}`}
        alt={product[0]?.name}
        className="single-product-image"
      />
      <div className="single-product-info">
        <h1 className="single-product-title">{product[0]?.name}</h1>
        <p className="single-product-description">{product[0]?.description}</p>
        <p className="single-product-price">Price: ${product[0]?.price}</p>
        <p className="single-product-sold">Sold: {product[0]?.sold}</p>
        <button
          className="single-product-buy-button"
          onClick={() => navigate(`/payment/${id}`)}
        >
          Buy Now
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ProductPage;
