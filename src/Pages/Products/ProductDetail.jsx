import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Layout/Header";
// import ProductList from "../../../updated_products.json";
import { useLocation, useNavigate } from "react-router-dom";
import "./productlist.css";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
import { errorMessage, successMessage } from "../../Utils/Alert";
import Modal from "../../Components/Modal/Modal";
import { modalStyle, userId } from "../../Constants/Constant";
import { GiCash, GiWallet } from "react-icons/gi";
import { FaAmazonPay, FaStar } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import EmptyRecords from "../../Components/EmptyRecords/EmptyRecords";

const style = {
  maxWidth: "800px",
  // height: "300px",
  width: "90%",
  borderRadius: "2px",
  position: "relative",
  animation: "fadeInScale 0.3s ease",
};

const ProductDetail = () => {
  const location = useLocation();
  // const ref = useRef();
  const searchParams = new URLSearchParams(location.search);
  const productName = searchParams.get("q"); // Automatically decodes
  // console.log(productName); // "Wireless Headphones @ 2 GEN"

  const [product, setProduct] = useState(null);
  const [imageView, setImageView] = useState(0);
  const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
  const userLoggedIn = true;
  const navigate = useNavigate();
  const [isCartProduct, setIsCartProduct] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [open, setOpen] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [uAF, setUAF] = useState(false);
  const [search, setSearch] = useState("");

  const PAYMENT_MODES = [
    { mode: "card", icon: <GiWallet size={26} /> },
    { mode: "upi", icon: <FaAmazonPay size={26} /> },
    { mode: "cod", icon: <GiCash size={26} /> },
  ];
  const [paymentMode, setPaymentMode] = useState("");

  const addToCart = async (e, product) => {
    e.preventDefault();

    if (!userLoggedIn) {
      const fetchCartList = JSON.parse(localStorage.getItem("cartItems")) || [];
      const isProductExits = fetchCartList.find(
        (productId) => productId._id === product._id
      );

      const isProductExitsInDb = cartList.find(
        (productId) => productId._id === product._id
      );
      if (isProductExitsInDb && isProductExits) {
        alert("Chosen Product is already in cart...!!!");
        navigate("/cart");
        return;
      }
      // if(fetchCart)
      fetchCartList.push(product);
      localStorage.setItem("cartItems", JSON.stringify(fetchCartList));
    }

    await createCart(product._id);
    // navigate("/cart");
  };

  const goToCart = () => {
    navigate("/cart");
    return;
  };

  const buyNow = (e, product) => {
    e.preventDefault();
    setOpen(true);
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

  const createCart = async (productId) => {
    try {
      const payload = {
        userId: userId,
        productId: productId,
      };
      const response = await axiosInstanceV1.post("/cart/create", payload);
      if (response.status === 201) {
        successMessage(response.data.message);
        fetchCartList();
        navigate("/cart");
        return;
      }
    } catch (error) {
      return error;
    }
  };

  const fetchCartList = async () => {
    try {
      const payload = {
        userId: userId,
      };
      const response = await axiosInstanceV1.get(
        `/cart/list?userId=${payload.userId}`
      );
      if (response.status === 200) {
        setCartList(response.data.cartList);
        return;
      }
    } catch (error) {
      return error;
    }
  };

  const fetchAddressList = async () => {
    const qP = new URLSearchParams();
    userId && qP.append("userId", userId);
    try {
      const response = await axiosInstanceV1.get(`/address?${qP.toString()}`);
      if (response.status === 200) {
        // successMessage(response.data.message);
        setAddressList(response.data.addressList);
        return;
      }
    } catch (error) {
      return errorMessage(error.message);
    }
  };

  const changeDefaultAddress = async (_id) => {
    try {
      const payload = {
        userId,
        _id: _id,
        isDefault: true,
      };
      const response = await axiosInstanceV1.patch(`/address/${_id}`, payload);
      if (response.status == 202) {
        // successMessage(response.data.message);
        setUAF(false);
        fetchDefaultAddress();
        fetchAddressList();
      }
    } catch (error) {
      errorMessage(error.response?.data.message || error.message);
      return error;
    }
  };

  useEffect(() => {
    // const findProduct =
    //   location.state?.name === productName ? location.state : null;
    // const cartLists = JSON.parse(localStorage.getItem("cartItems")) || [];
    // const isProductMatched = cartLists.find(
    //   (productId) => productId.name === findProduct.name
    // );

    if (!productName && !cartList.length) {
      setIsCartProduct(false);
      return;
    }
    const isMatchedProduct = cartList.find((items) => {
      const match = items.productId.name === productName;
      return match;
    });

    if (isMatchedProduct) {
      setIsCartProduct(true);
    } else {
      setIsCartProduct(false);
    }
  }, [cartList]);

  useEffect(() => {
    fetchCartList();
  }, []);

  useEffect(() => {
    const findProduct =
      location.state?.name === productName ? location.state : null;

    setProduct(findProduct);
  }, []);

  const payNow = async () => {
    try {
      if (!paymentMode) {
        errorMessage("Please select payment mode..!");
        return;
      }

      // console.log("clicked");

      const payload = {};
      const orderId = `Order_${Date.now()}`;
      // let userId = userId;
      const quantity = 1;
      const shippingPrice = 50;

      const discountPrice =
        product.price - (product.price * product.discount) / 100;
      const discountAmount = (product.price - discountPrice) * quantity;
      const finalPrice = discountPrice * quantity + shippingPrice;

      if (userId) payload.userId = userId;
      if (orderId) payload.orderId = orderId;

      if (shippingPrice) payload.shippingPrice = shippingPrice;

      if (discountAmount) payload.discountAmount = discountAmount;
      if (finalPrice) payload.finalPrice = finalPrice;
      if (paymentMode) payload.paymentMode = paymentMode;
      if (product.discount) payload.discountPercent = product.discount;
      if (defaultAddress) payload.addressId = defaultAddress._id;
      payload.products = [
        {
          product: product._id,
          quantity: quantity,
          originalPrice: product.price,
          discountPrice: discountPrice,
          discountPercent: product.discount,
        },
      ];

      const response = await axiosInstanceV1.post("/booking", payload);

      if (response.status === 201) {
        if (paymentMode !== "cod") {
          window.location.href = response?.data?.paymentLink;
        } else {
          setOpen(false);
          setTimeout(() => navigate("/orders"), 100);
        }
        successMessage(response.data.message);
        return;
      }
    } catch (error) {
      console.log(error);

      errorMessage(error.response?.data.message || error.message);
      return error;
    }
  };

  // console.log(product);

  const fetchDefaultAddress = async () => {
    try {
      const response = await axiosInstanceV1.get(`/address/default/${userId}`);
      if (response.status === 200) {
        setDefaultAddress(response.data.defaultAddress);
      }
    } catch (error) {
      errorMessage(error.response?.data.message || error.message);
      return error;
    }
  };

  const handleChangeAddress = (e) => {
    e.preventDefault();
    setUAF(true);
  };

  useEffect(() => {
    userId && fetchDefaultAddress();
    userId && fetchAddressList();
  }, []);

  return (
    <div>
      <Header />
      {/* <div>Page is Under Construction</div> */}
      <div>{product === null && <EmptyRecords Page={"Product"} />}</div>
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
              onClick={(e) =>
                isCartProduct ? goToCart(e, product) : addToCart(e, product)
              }
            >
              {isCartProduct ? "Go to Cart" : "Add to Cart"}
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
          <h1 style={{ textTransform: "capitalize" }}>{product?.name}</h1>
          <div className="pd-price">
            <p className="price-text">
              <strike> RS.{product?.price}</strike>{" "}
              <strong>
                {/* ₹ */}Rs.
                {Math.round(
                  product?.price - (product?.price * product?.discount) / 100
                )}
              </strong>{" "}
              <span className="discount">{product?.discount}% off </span>
            </p>
          </div>
          <div className="rating-review">
            <p className="rating">
              {product?.rating} <FaStar size={15} />
            </p>
            <p style={{ cursor: "pointer" }}>
              ({product?.totalReviews} Reviews & Ratings)
            </p>
          </div>
          {product?.stock < 10 && (
            <p style={{ color: "red" }}>Hurry Up Only {product?.stock} left</p>
          )}
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
          <div className="offers-section">
            <h3 style={{ padding: "10px 0px" }}>Available offers</h3>

            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <li>
                <strong style={{ color: "green" }}>Bank Offer: </strong>
                5% cashback on Flipkart Axis Bank Credit Card up to ₹4,000 per
                statement quarter
                <a href="#">T&amp;C</a>
              </li>
              <li>
                <strong style={{ color: "green" }}>Bank Offer: </strong>
                5% cashback on Axis Bank Flipkart Debit Card up to ₹750
                <a href="#">T&amp;C</a>
              </li>
              <li>
                <strong style={{ color: "green" }}>Bank Offer: </strong>
                10% off up to ₹1500 on Axis Bank Credit Card EMI Txn. Min Txn
                Value ₹7500
                <a href="#">T&amp;C</a>
              </li>
              <li>
                <strong style={{ color: "green" }}>Special Price: </strong>
                Get extra 53% off (price inclusive of cashback/coupon)
                <a href="#">T&amp;C</a>
              </li>
            </ul>
          </div>

          <div className="address-container">
            <div>
              <h1>Address: </h1>
            </div>
            <div className="address-body">
              <HiLocationMarker size={20} color="rgb(110, 110, 223)" />
              <input
                type="text"
                name="addressId"
                id="addressId"
                value={` ${defaultAddress?.name} - ${defaultAddress?.houseNumber}, ${defaultAddress?.area},  ${defaultAddress?.state} - ${defaultAddress?.pincode}`}
                className="address"
                readOnly
              />
              <button
                type="button"
                className="change"
                onClick={handleChangeAddress}
              >
                Change
              </button>
            </div>
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
          <div className="description">
            <h1>Description: </h1>
            <p style={{ fontWeight: "normal", color: "black" }}>
              {product?.description}
            </p>
          </div>
        </div>
      </div>

      {product?.reviewList?.length > 0 && (
        <div className="review-container" id="reviews">
          <div className="review-header">
            <h2>Product Review: </h2>
          </div>
          <div className="review-body">
            {product?.reviewList?.map((review) => {
              return (
                <div className="review-card" key={review._id}>
                  <h3
                    style={{
                      color: "rgb(110, 110, 223)",
                      textTransform: "capitalize",
                      display: "flex",
                      gap: "10px",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    {review.userId.name} -{" "}
                    <span className="rating">
                      {review.rating}
                      <FaStar size={15} />
                    </span>
                  </h3>
                  <p style={{ color: "black" }}>{review.comment}</p>
                  <p style={{ color: "gray" }}>
                    reviewed on: {review?.createdAt?.split("T")[0]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Modal style={modalStyle} open={open}>
        <div className="header">
          <h2>Please Select The Payment Mode to create booking</h2>
          <div className="body">
            {PAYMENT_MODES.map((mode, i) => {
              return (
                <div className="subbody" key={i}>
                  <input
                    type="radio"
                    name="mode"
                    id="mode"
                    value={mode.mode}
                    checked={paymentMode === mode.mode}
                    className="mode"
                    onChange={(e) => setPaymentMode(e.target.value)}
                  />
                  <label htmlFor={mode} className="modeName">
                    <span className="icon">{mode.icon}</span> {mode.mode}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="footer">
            <button type="button" className="payNow" onClick={payNow}>
              Pay Now
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => setOpen(false)}
            >
              Cancel Payment
            </button>
          </div>
        </div>
      </Modal>
      <Modal style={style} open={uAF}>
        <div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <CgClose
              size={24}
              cursor={"pointer"}
              onClick={() => setUAF(false)}
            />
          </div>
          <div>
            <input
              type="search"
              name="search"
              id="search"
              className="search"
              placeholder="Search address"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="address-list">
            {addressList
              ?.filter((it) =>
                it.name.toLowerCase().includes(search.toLowerCase())
              )
              ?.map((item) => {
                return (
                  <div
                    className={"card"}
                    key={item._id}
                    style={
                      item?.isDefault
                        ? {
                            backgroundColor: "rgb(199, 199, 240)",
                            border: "1px solid rgb(199, 199, 240)",
                          }
                        : {}
                    }
                    onClick={() => changeDefaultAddress(item._id)}
                  >
                    <div className={"headersection"}>
                      <h2>
                        {item.name}
                        {item.addressType === "Home"
                          ? `'s ${item.addressType}`
                          : item.addressType === "Work" &&
                            ` ${item.addressType}place`}{" "}
                        {item.isDefault && (
                          <span className={"span"}>default</span>
                        )}
                      </h2>
                    </div>
                    <p>
                      {item.houseNumber}, {item.area}
                    </p>
                    <p>
                      {item.state} -{item.pincode}
                    </p>
                    <p>Phone Number: {item.phoneNumber}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;
