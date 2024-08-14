import React from "react";
import emailjs from "emailjs-com";

export const ContactUs = () => {
  // Data object containing the necessary information to send
  const formData = {
    user_name: "John Doe", // Example name
    reply_to: "pixelgamedevs@gmail.com  ", // Example email
    message: "Thank you for buying our product",
    from_name: "ReShop",
    product_name: "Cool Gadget",
    product_price: "49.99",
    product_status: "processing",
    from_url: "https://reshop.com",
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_52pzts8", // Your EmailJS service ID
        "template_ci5wakp", // Your EmailJS template ID
        formData, // Pass the data object directly
        "0eKoB3IdMy7pPubVL" // Your EmailJS user ID
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
        },
        (error) => {
          console.log("Email sending error:", error.text);
        }
      );
  };

  return (
    <div>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};
