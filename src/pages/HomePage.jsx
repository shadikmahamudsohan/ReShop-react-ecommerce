import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      {/* hero section */}
      <div className="bg-gray-100 dark:bg-gray-950  h-screen flex">
        <div className="w-1/2 flex flex-col justify-center items-start m-20">
          <h1 className="text-7xl font-semibold">Welcome to Reshop</h1>
          <p className="text-2xl py-4">
            The best ecommerce website where you can find all the things you
            need
          </p>
          <Link
            to="/shop"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Shop now
          </Link>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="product"
              className="w-2/3 animate-float"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
