import React, { useEffect, useState } from "react";
import Header from "../../Components/Layout/Header";
// import ProductList from "../../../updated_products.json";
import { useLocation, useNavigate } from "react-router-dom";
import "./productlist.css";

const ProductDetail = () => {
  const location = useLocation();
  const productName = decodeURIComponent(location.search.split("=")[1]);
  const [product, setProduct] = useState(null);
  const [imageView, setImageView] = useState(0);
  const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png"];
  console.log(location);
  const navigate = useNavigate()

  const addToCart = (e, product) => {
    e.preventDefault();
    navigate("/cart")
  };
  const butNow = (e, product) => {
    e.preventDefault();
     navigate("/cart")
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (imageView > 0) {
      setImageView((prev) => prev - 1);
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
    if (imageView < product?.images?.length - 1) {
      setImageView((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const findProduct =
      location.state?.name === productName ? location.state : null;
    // console.log(findProduct);
    setProduct(findProduct);
  }, []);

  console.log(product);

  return (
    <div>
      <Header />
      {/* <div>Page is Under Construction</div> */}
      <div>{product === null && <p>Product Not Found</p>}</div>
      <div className="pd-container">
        <div className="pd-left">
          <div className="pd-image-container">
            {product?.images?.length > 0 &&
              (() => {
                const image = product.images[imageView];
                const extension = image.split(".").pop().toLowerCase();

                return IMAGE_EXTENSIONS.includes(extension) ? (
                  <img
                    src={image}
                    alt={product?.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/errorimage.png";
                    }}
                  />
                ) : (
                  <video src={image} controls />
                );
              })()}
            <div className="arrows">
              <button
                type="button"
                className={`left ${imageView == 0 && "stop-cursor"}`}
                onClick={handlePrevious}
                disabled={imageView == 0}
              >
                &lt;
              </button>
              <button
                type="button"
                className={`right ${
                  imageView === product?.images?.length - 1 && "stop-cursor"
                }`}
                onClick={handleNext}
                disabled={imageView === product?.images?.length - 1}
              >
                &gt;
              </button>
            </div>
          </div>
          <div className="cta">
            <button
              className="cta-b1"
              type="button"
              onClick={(e) => addToCart(e, product)}
            >
              Add To Cart
            </button>
            <button
              className="cta-b2"
              type="button"
              onClick={(e) => buyNow(e, product)}
            >
              Buy Now
            </button>
          </div>
        </div>
        <div className="pd-body">
          <h1>{product?.name}</h1>
          <div className="pd-price">
            <p>
              RS.{product?.price} <span>({product?.totalReviews} reviews)</span>
            </p>
            <p>⭐{product?.rating}</p>
          </div>

          {product?.offers?.length && (
            <div className="offers">
              <h1>Offers:</h1>
              {product?.offers?.map((offer, i) => (
                <li style={{ fontWeight: "normal" }} key={i}>
                  {offer}
                </li>
              ))}
            </div>
          )}
          <div className="description">
            <h1>Description: </h1>
            <p style={{ fontWeight: "normal" }}>{product?.description}</p>
          </div>
          <div className="highlights">
            <h1>Highlights: </h1>
            {product?.highlights?.map((spec, i) => (
              <li style={{ fontWeight: "normal" }} key={i}>
                {spec}
              </li>
            ))}
          </div>
          <div className="specifications">
            <h1>Specifications: </h1>
            {product?.specifications &&
              Object.keys(product?.specifications).map((key, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "0.6rem",
                  }}
                >
                  <span style={{ fontWeight: "600" }}>{key} : </span>
                  <span style={{ fontWeight: "normal" }}>
                    {product?.specifications[key]}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
