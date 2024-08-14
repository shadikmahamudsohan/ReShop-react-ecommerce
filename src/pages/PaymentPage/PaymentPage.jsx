import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../../components/PaymentForm";
import { useParams } from "react-router-dom";
import UseGet from "../../hooks/UseGet";

const stripePromise = loadStripe(
  "pk_test_51L0erJFO4ypSR6bZcP2M1BZv8IdBPQHsUwLBgg7G5B06fU7bwGlqtdgWEXDQTrRJMmYFNVCBNt1G79Yk7GlVSSUa00BaitXEwA"
);
const PaymentPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    UseGet({ setData: setProduct, route: `product?_id=${id}` });
  }, [id]);
  return (
    <Elements stripe={stripePromise}>
      {product ? (
        <PaymentForm
          productId={id}
          price={product[0]?.price}
          product={product[0]}
        />
      ) : (
        "loading..."
      )}
    </Elements>
  );
};

export default PaymentPage;
