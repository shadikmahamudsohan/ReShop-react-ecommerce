import React, { useEffect, useState } from "react";
import SingleProduct from "../../components/ShopPageComponents/SingleProduct";
import "./ShopPage.css";
import UseGet from "../../hooks/UseGet";

const ShopPage = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    UseGet({ setData: setProduct, route: "product" });
  }, []);

  // const products = [
  //   {
  //     _id: 1,
  //     imgUrl: "https://picsum.photos/500",
  //     title: "Product 1",
  //     description: "Description for product 1",
  //     price: 19.99,
  //     sold: 12,
  //   },
  //   {
  //     _id: 2,
  //     imgUrl: "https://picsum.photos/501",
  //     title: "Product 2",
  //     description: "Description for product 2",
  //     price: 29.99,
  //     sold: 8,
  //   },
  //   {
  //     _id: 3,
  //     imgUrl: "https://picsum.photos/502",
  //     title: "Product 3",
  //     description: "Description for product 3",
  //     price: 14.99,
  //     sold: 25,
  //   },
  //   {
  //     _id: 4,
  //     imgUrl: "https://picsum.photos/503",
  //     title: "Product 4",
  //     description: "Description for product 4",
  //     price: 39.99,
  //     sold: 15,
  //   },
  //   // Add more products as needed
  // ];

  return (
    <div className="shop-container">
      <div className="shop-grid">
        {products.map((product) => (
          <SingleProduct key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
