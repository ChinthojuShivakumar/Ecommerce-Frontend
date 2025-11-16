import { useLocation, useNavigate } from "react-router-dom";

import styles from "./bookingdetail.module.css";
import { useEffect, useState } from "react";
import { BiHome } from "react-icons/bi";
import { LuLocate } from "react-icons/lu";
import { PiPhone } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";

import Header from "../../../Components/Layout/Header";
import Stepper from "../../../Components/Stepper/Stepper";
import { errorMessage, successMessage } from "../../../Utils/Alert";
import { axiosInstanceV1 } from "../../../Utils/ApiServices";

const BookingDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  // console.log(state);

  const qP = new URLSearchParams(location.search);
  const [product, setProduct] = useState({});
  const [stars, setStars] = useState(-1);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  const steps = ["Order Placed", "Shipped", "Out for Delivery", "Delivered"];
  const [currentStep, setCurrentStep] = useState(1);
  // let currentStep = 1;

  useEffect(() => {
    const findProduct = state?.products.find(
      (product) => product._id === qP.get("productId")
    );
    // console.log(findProduct);
    setStatus(findProduct.status);
    let step = 1;
    if (findProduct?.shippedAt) {
      step = 2;
    }
    if (findProduct?.deliveredAt) {
      step = 4;
    }

    if (!findProduct.shippedAt && !findProduct.deliveredAt) {
      step = 1;
    }
    if (
      findProduct.shippedAt &&
      findProduct.status.toLowerCase() === "out for delivery"
    ) {
      step = 3;
    }
    const createdAt = new Date(stars.createdAt);
    const sevenDaysLater = new Date(createdAt);
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    if (new Date(state?.createdAt) > sevenDaysLater) {
      step = 3;
    }

    setCurrentStep(step);
    setProduct(findProduct);
    setStars(findProduct?.review?.rating - 1);
    setComment(findProduct?.review?.comment);
  }, [state]);
  console.log(product);

  const handleClickProduct = (booking, productId) => {
    const qP = new URLSearchParams();
    // console.log(booking);

    qP.append("bookingId", booking._id);
    qP.append("linkId", booking.orderId);
    qP.append("productId", productId);
    // console.log(qP.toString());

    navigate(`/admin/booking?${qP.toString()}`, { state: booking });
    window.location.reload();
    return;
  };

  const updateStatus = async () => {
    try {
      const payload = {
        status: status,
        _id: qP.get("bookingId"),
        productId: qP.get("productId"),
      };
      const response = await axiosInstanceV1.patch("/booking", payload);
      if (response.status === 202) {
        successMessage(response.data.message);
        // window.location.reload();
        navigate(-1);
        return;
      }
    } catch (error) {
      errorMessage(error.response.data.message);
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
                    <b>{product?.discountPrice}</b>
                    <strong>{product?.discountPercent}% off</strong>
                  </p>
                  <p style={{ color: "black" }}>
                    Quantity: {product?.quantity}
                  </p>
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
            <div className={styles.ratingContainer}>
              {Array.from({ length: 5 }).map((_, i) => {
                return (
                  <FaStar
                    size={38}
                    key={i}
                    cursor={"pointer"}
                    // onClick={() => setStars(i)}
                    style={{
                      color: i <= stars ? "green" : "rgb(206, 198, 198)",
                    }}
                  />
                );
              })}
            </div>
            {stars >= 0 && (
              <textarea
                style={{
                  width: "100%",
                  margin: "15px 0px",
                  padding: "10px",
                  fontSize: "1rem",
                }}
                placeholder="Write comment on rating"
                cols={10}
                rows={5}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                readOnly
              ></textarea>
            )}
          </div>
          {state?.products?.length > 1 && (
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
                          <img src={item?.product?.images[0]?.url} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          {product?.shippedAt && !product?.deliveredAt && (
            <div className={styles.footer}>
              <p className={styles.cancel}>Cancel Booking</p>
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
                    {state?.addressId?.addressType === "Home" ? (
                      <BiHome size={26} />
                    ) : (
                      <LuLocate size={26} />
                    )}
                    <strong>{state?.addressId?.addressType}</strong>
                  </div>

                  <div className={styles.addressText}>
                    {state?.addressId.houseNumber}, {state?.addressId.village},{" "}
                    {state?.addressId.mandala},<br />
                    {state?.addressId.district}, {state?.addressId.state} -{" "}
                    {state?.addressId.pincode}
                  </div>
                </div>

                <p className={styles.phoneNumber}>
                  <PiPhone size={20} />
                  {state.addressId.name} <b>{state.addressId.phoneNumber}</b>
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
                  <b>&#8377;{state.discountAmount}</b>
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
                  <b>&#8377;{state.finalPrice}</b>
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
                  {state.paymentMode !== "COD"
                    ? "Cash On Delivery"
                    : state.paymentMode}
                </b>
              </p>
            </div>
          </div>
          <div className={styles.statusContainer}>
            <select
              name="status"
              id="status"
              style={{ width: "70%" }}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="SHIPPED">Shipped</option>
              <option value="OUT FOR DELIVERY">Out for delivery</option>
              <option value="DELIVERED">Delivered</option>
              <option value="RETURNED">Returned</option>
            </select>
            <button
              type="button"
              className={styles.update}
              onClick={updateStatus}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
