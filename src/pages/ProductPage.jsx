import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UseGet from "../hooks/UseGet";
const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    UseGet({ setData: setProduct, route: `product?_id=${id}` });
  }, [id]);

  return (
    <div className="">
      <img
        src={`${process.env.REACT_APP_serverApi}${product[0]?.image}`}
        alt={product[0]?.name}
        className=""
      />
      <div className="">
        <h1 className="">{product[0]?.name}</h1>
        <p className="">{product[0]?.description}</p>
        <p className="">Price: ${product[0]?.price}</p>
        <p className="">Sold: {product[0]?.sold}</p>
        <button className="" onClick={() => navigate(`/payment/${id}`)}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
