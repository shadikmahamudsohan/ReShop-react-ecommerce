import React, { useState } from "react";
import "./CreateProductPage.css";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const CreateProductPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 3,
      // maxWidthOrHeight: 1920,
    };
    const compressedFile = await imageCompression(image, options);
    var file = new File([compressedFile], image?.name, {
      type: image?.type,
    });
    const imageFile = new FormData();
    imageFile.append("image", file);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(token)}`, // notice the Bearer before your token
      },
      body: JSON.stringify({ name, description, price }),
    };
    const imageRequestOptions = {
      method: "POST",
      headers: {
        // don't use Content-type it won't work
        Authorization: `Bearer ${JSON.parse(token)}`, // notice the Bearer before your token
      },
      body: imageFile,
    };

    fetch(`${process.env.REACT_APP_serverApi}product`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Success") {
          //   uploading the image to the server and updating the product data
          fetch(
            `${process.env.REACT_APP_serverApi}product/uploadImage?id=${data.data._id}`,
            imageRequestOptions
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "Success") {
                toast("product created");
              }
            });
        }
      });
  };

  return (
    <div className="create-product-page">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <div className="custom-file-upload">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {/* Display selected image or placeholder */}
          </div>
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProductPage;
