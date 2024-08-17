import React from "react";
import { Link, useNavigate } from "react-router-dom";
const SingleProduct = ({ data }) => {
  const { image, name, description, price, sold } = data;
  const navigate = useNavigate();

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <Link to={`/product/${data._id}`}>
        <div className=" h-60 w-full overflow-hidden rounded-t-lg">
          <img
            src={`${process.env.REACT_APP_serverApi}${image}`}
            alt={name}
            className="h-60 w-full object-cover rounded-t-lg hover:scale-110 transition-transform duration-300 "
          />
        </div>
      </Link>
      <div class="p-5">
        <Link to={`/product/${data._id}`}>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </Link>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Price: <span className="font-bold text-2xl"> ${price}</span>
        </p>
        <Link
          to={`/product/${data._id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {" "}
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;
