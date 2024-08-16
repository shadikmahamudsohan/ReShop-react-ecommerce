import React, { useEffect, useState } from "react";
import UseGet from "../hooks/UseGet";
import SingleProduct from "../components/SingleProduct";

const ShopPage = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    UseGet({ setData: setProduct, route: "product" });
  }, []);

  return (
    <div className="">
      <div className="">
        {products.map((product) => (
          <SingleProduct key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
