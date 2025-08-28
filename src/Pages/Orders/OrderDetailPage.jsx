import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Components/Layout/Header";
import styles from "./orderdetailpage.module.css";
import { useEffect, useState } from "react";
import { BiHome } from "react-icons/bi";
import { LuLocate } from "react-icons/lu";
import { PiPhone } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import Stepper from "../../Components/Stepper/Stepper";
import { errorMessage, successMessage } from "../../Utils/Alert";
import { axiosInstanceV1 } from "../../Utils/ApiServices";
import { userId } from "../../Constants/Constant";

const OrderDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const qP = new URLSearchParams(location.search);
  const [product, setProduct] = useState({});
  const [stars, setStars] = useState(-1);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState(null);

  const [steps, setSteps] = useState(["Order Placed", "Shipped", "Out for Delivery", "Delivered"]);
const [currentStep, setCurrentStep] = useState(1);


useEffect(() => {
  const findProduct = state.products.find(
    (product) => product._id === qP.get("orderId")
  );

  setProduct(findProduct);
  setComment(findProduct.review?.comment);
  setStars(findProduct.review?.rating);

  // dynamically update steps based on product let newSteps = [];

  // 1. cancelled → only 2 steps
  if (findProduct.status?.toLowerCase() === "cancelled") {
    newSteps = ["Order Placed", "Cancelled"];
    setSteps(newSteps);
    setCurrentStep(2); // since cancelled is final
    return; // stop further calculation
  }

  // 2. returned → append to normal flow
  newSteps = ["Order Placed", "Shipped", "Out for Delivery", "Delivered"];
  if (findProduct.status?.toLowerCase() === "returned") {
    newSteps.push("Returned");
  }

  setSteps(newSteps);

  // calculate current step
  let step = 1;
  if (findProduct.shippedAt) {
    step = 2;
  }
  if (findProduct.deliveredAt) {
    step = 4;
  }
  if(findProduct.returnedAt) {
    step=5
    }
    if(findProduct.cancelledAt) {
      step=2
      }

  // check if delivery exceeded 7 days → set step = 3
  if (findProduct.createdAt) {
    const createdAt = new Date(findProduct.createdAt);
    const sevenDaysLater = new Date(createdAt);
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    if (new Date() > sevenDaysLater && step < 3) {
      step = 3;
    }
  }

  setCurrentStep(step);
  setStatus(findProduct.status);
}, [state, qP]);


  const handleClickProduct = (booking, productId) => {
    const qP = new URLSearchParams();
    qP.append("linkId", booking.orderId);
    qP.append("userId", booking.userId._id);
    qP.append("orderId", productId);
    navigate(`/order?${qP.toString()}`, { state: booking });
    window.location.reload();
    return;
  };

  const postReview = async (productId, orderId) => {
    try {
      const payload = {
        rating: Number(stars + 1),
        comment: comment,
        productId: productId,
        orderId: orderId,
        userId,
      };
      const response = await axiosInstanceV1.post("/review/create", payload);
      if (response.status == 201) {
        successMessage(response.data.message);
        navigate(-1);
        return;
      }
    } catch (error) {
      errorMessage(error.response.data.message);
      return error;
    }
  };

  const cancelBooking = async (bookingId, product_id) => {
    const payload = {
      status: "CANCELLED",
      _id: bookingId,
      productId: product_id,
    };
    try {
      const response = await axiosInstanceV1.patch("/booking", payload);
      if (response.status == 201) {
        // successMessage(response.data.message);
        return;
      }
    } catch (error) {
      errorMessage(error.response.data.message);
      return error;
    }
  };
  const returnBooking = async (bookingId, product_id) => {
    const payload = {
      status: "RETURNED",
      _id: bookingId,
      productId: product_id,
    };
    try {
      const response = await axiosInstanceV1.patch("/booking", payload);
      if (response.status == 201) {
        successMessage(response.data.message);
        return;
      }
    } catch (error) {
      // errorMessage(error.response.data.message);
      return error;
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div>
          {" "}
          <div className={styles.subContainer}>
            <div className={styles.productBody}>
              <div className={styles.cardBody}>
                <div className={styles.bod}>
                  <h2 style={{ textTransform: "capitalize" }}>
                    {product?.product?.name}
                  </h2>
                  <p className={styles.price}>
                    RS.<strike>{product?.originalPrice}</strike>{" "}
                    <b>{product?.discountPrice?.toFixed(2)}</b>
                    <strong style={{ color: "var(--secondary-color)" }}>
                      {product.discountPercent}% off
                    </strong>
                  </p>
                  <p style={{ color: "black" }}>Quantity: {product.quantity}</p>
                </div>
              </div>
              <div className={styles.cardImage}>
                <img
                  src={product?.product?.images[0]?.url}
                  alt={product?.product?.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/errorimage.png";
                  }}
                />
              </div>
            </div>
            <Stepper steps={steps} currentStep={currentStep} />
            {status?.toUpperCase() === "DELIVERED" && (
              <div className={styles.ratingContainer}>
                {Array.from({ length: 5 }).map((_, i) => {
                  return (
                    <FaStar
                      size={38}
                      key={i}
                      cursor={"pointer"}
                      onClick={() =>
                        product.review == null &&
                        setStars(stars === i + 1 ? -1 : i + 1)
                      }
                      values={stars}
                      style={{
                        color:
                          i + 1 <= stars
                            ? "var(--secondary-color)"
                            : "rgb(206, 198, 198)",
                      }}
                    />
                  );
                })}
              </div>
            )}
            {status?.toUpperCase() === "DELIVERED" && stars >= 0 && (
              <div className={styles.comment}>
                <textarea
                  style={{
                    width: "100%",
                    margin: "15px 0px",
                    padding: "5px",
                    fontSize: "1rem",
                    resize: "none", // disable resize
                    overflow: "auto", // keep scroll if text overflows
                  }}
                  placeholder="Write comment on rating"
                  cols={10}
                  rows={5}
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  disabled={product.review !== null}
                ></textarea>
                {product.review == null && (
                  <button
                    type="button"
                    className={styles.submit}
                    onClick={() => postReview(product.product._id, state._id)}
                  >
                    Submit
                  </button>
                )}
              </div>
            )}
          </div>
          {state.products.length > 1 && (
            <div>
              <div style={{ margin: "10px 0px" }}>
                <h2>Other Products on this order</h2>
              </div>
              <div>
                {state.products
                  .filter((product) => product._id !== qP.get("orderId"))
                  .map((item) => {
                    return (
                      <div
                        className={styles.productCard}
                        onClick={() => handleClickProduct(state, item._id)}
                        key={item._id}
                      >
                        <div className={styles.cardText}>
                          <h2
                            style={{
                              textTransform: "capitalize",
                              width: "70%",
                            }}
                          >
                            {item.product.name}
                          </h2>
                          <div
                            style={{
                              color: "black",
                              display: "flex",
                              justifyContent: "start",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "5px",
                                height: "5px",
                                border: `2px solid ${
                                  item.status === "cancelled" ? "red" : "green"
                                }`,
                                borderRadius: "100%",
                                backgroundColor:
                                  item.status === "cancelled" ? "red" : "green",
                              }}
                            ></div>
                            &nbsp;{" "}
                            {item.status.charAt(0).toUpperCase() +
                              item.status.slice(1).toLowerCase()}
                          </div>
                          {/* <p>RS.{item.originalPrice}</p> */}
                        </div>
                        <div className={styles.cardImage}>
                          <img src={item?.product?.images[0]} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          {!product.deliveredAt && (
            <div className={styles.footer}>
              <p
                className={styles.cancel}
                onClick={() => cancelBooking(state._id, product._id)}
              >
                Cancel Booking
              </p>
              {/* <p className={styles.return}>Return Product</p> */}
            </div>
          )}
          {product.deliveredAt &&
            new Date() <=
              new Date(product.deliveredAt).getTime() +
                7 * 24 * 60 * 60 * 1000 && (
              <div className={styles.footer}>
                <p
                  className={styles.cancel}
                  onClick={() => returnBooking(state._id, product._id)}
                >
                  Return Booking
                </p>
                {/* <p className={styles.return}>Return Product</p> */}
              </div>
            )}
        </div>
        <div>
          <div>
            <div>
              <h2>Address Details</h2>
            </div>
            <div>
              <div className={styles.addressHeader}>
                <div className={styles.address}>
                  <div className={styles.addressType}>
                    {state.addressId?.addressType === "Home" ? (
                      <BiHome size={26} />
                    ) : (
                      <LuLocate size={26} />
                    )}
                    <strong>{state.addressId?.addressType}</strong>
                  </div>

                  <div className={styles.addressText}>
                    {state.addressId?.houseNumber}, {state.addressId?.area},{" "}
                     {state.addressId?.state} -{" "}
                    {state.addressId?.pincode}
                  </div>
                </div>

                <p className={styles.phoneNumber}>
                  <PiPhone size={20} />
                  {state.addressId?.name} <b>{state.addressId?.phoneNumber}</b>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.priceContainer}>
            <div>
              <h2>Price Details</h2>
            </div>
            <div className={styles.priceBody}>
              <div className={styles.priceText}>
                <p> List Price:</p>
                <p>
                  <b>&#8377;{state.totalPrice}</b>
                </p>
              </div>
              <div className={styles.priceText}>
                <p>Discount:</p>
                <p>
                  <b>&#8377;{state.discountAmount?.toFixed(2)}</b>
                </p>
              </div>
              <div className={styles.priceText}>
                <p>Shipping Price: </p>
                <p>
                  <b>&#8377;{state.shippingPrice}</b>
                </p>
              </div>
              <div className={styles.priceText}>
                <p>Final Price:</p>
                <p>
                  <b>&#8377;{state.finalPrice.toFixed(2)}</b>
                </p>
              </div>
            </div>
            <div className={styles.paymentMode}>
              <p style={{ color: "black", textTransform: "capitalize" }}>
                Payment Mode:{" "}
                <b
                  style={
                    state.paymentMode !== "COD" && {
                      textTransform: "uppercase",
                    }
                  }
                >
                  &nbsp;{" "}
                  {state.paymentMode.toUpperCase() == "COD"
                    ? "Cash On Delivery"
                    : state.paymentMode}
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
