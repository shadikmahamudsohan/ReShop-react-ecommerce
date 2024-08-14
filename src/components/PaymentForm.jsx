import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./PaymentForm.css";
import { toast } from "react-toastify";
import { init, send } from "emailjs-com";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import emailjs from "emailjs-com";
import { useLocation } from "react-router-dom";

const PaymentForm = ({ productId, price, product }) => {
  const { user } = useContext(UserContext);

  const stripe = useStripe();
  const elements = useElements();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const homePageUrl = `${window.location.origin}/`; // Assuming home page is the root

  const formData = {
    // order_id: productId,
    // to_name: user?.name,
    // from_name: "ReShop",
    // product_name: product?.name,
    // product_price: product?.price,
    // product_status: "processing",
    // user_email: "pixelgamedevs@gmail.com",

    to_name: user?.name, // Example name
    reply_to: "pixelgamedevs@gmail.com  ", // Example email
    message: "Thank you for buying our product",
    from_name: "ReShop",
    product_name: product?.name,
    product_price: JSON.stringify(product?.price),
    product_status: "processing",
    from_url: homePageUrl,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a PaymentIntent on the server
    const response = await fetch(
      `${process.env.REACT_APP_serverApi}product/payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({ amount: price }),
      }
    );

    const { clientSecret } = await response.json();

    // Confirm the payment on the client
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      }
    );

    if (error) {
      console.error(error);
    } else if (paymentIntent.status === "succeeded") {
      // Update the user product after payment success
      await fetch(`${process.env.REACT_APP_serverApi}user/updateProduct`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({ productId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.status === "Success") {
            emailjs
              .send(
                process.env.REACT_APP_serviceID, // Your EmailJS service ID
                process.env.REACT_APP_templateID, // Your EmailJS template ID
                formData, // Pass the data object directly
                process.env.REACT_APP_userID // Your EmailJS user ID
              )
              .then(
                (result) => {
                  console.log("Email sent successfully:", result.text);
                },
                (error) => {
                  console.log("Email sending error:", error.text);
                }
              );
          }
        });

      console.log("Payment successful and user updated!");
    }
  };

  return (
    <div className="payment-form-container">
      <h2 className="form-title">Complete Your Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Card Number</label>
          <CardNumberElement className="custom-card-input" />
        </div>
        <div className="input-group">
          <label>Expiration Date</label>
          <CardExpiryElement className="custom-card-input" />
        </div>
        <div className="input-group">
          <label>CVC</label>
          <CardCvcElement className="custom-card-input" />
        </div>
        <button className="pay-button" type="submit" disabled={!stripe}>
          Pay Now {price}$
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
