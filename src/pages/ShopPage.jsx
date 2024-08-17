import React, { useEffect, useState } from "react";
import UseGet from "../hooks/UseGet";
import SingleProduct from "../components/SingleProduct";

const ShopPage = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    UseGet({ setData: setProduct, route: "product" });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
      {products.map((product) => (
        <SingleProduct key={product._id} data={product} />
      ))}
    </div>
  );
};

export default ShopPage;
