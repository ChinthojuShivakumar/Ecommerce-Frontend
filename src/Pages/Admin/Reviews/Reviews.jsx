import { useEffect, useState } from "react";
import styles from "./reviews.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LIMIT } from "../../../Constants/Constant";
import Header from "../../../Components/Layout/Header";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import Pagination from "../../../Components/Admin/Pagination/Pagination";
import { axiosInstanceV1 } from "../../../Utils/ApiServices";

const Reviews = () => {
  const TABLE_KEYS = ["OrderId", "Product Name", "User", "Review", "Rating"];
  const [totalPages, setTotalPages] = useState(null);
  const [limit, setLimit] = useState(10);
  const [totalReviews, setTotalReviews] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);
  const [reviewList, setReviewList] = useState([]);
  const [status, setStatus] = useState("");

  const fetchReviewList = async () => {
    const qP = new URLSearchParams();
    qP.append("limit", LIMIT);
    qP.append("page", page);
    // status !== "" && qP.append("status", status);
    try {
      const response = await axiosInstanceV1.get(
        `/review/list?${qP.toString()}`
      );
      if (response.status == 200) {
        setReviewList(response.data.reviewList);
        setTotalPages(response.data.totalPages);
        setLimit(response.data.limit);
        setTotalReviews(response.data.totalReviews);
      }
    } catch (error) {
      return error;
    }
  };

  const handleEditBooking = (bookingId, productId, booking) => {
    const qP = new URLSearchParams();
    qP.append("bookingId", bookingId);
    qP.append("productId", productId);
    qP.append("linkId", booking.orderId);
    navigate(`/admin/booking?${qP.toString()}`, { state: booking });
  };

  useEffect(() => {
    fetchReviewList();
    setSearchParams({ page });
  }, [page]);
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.sidemenu}>
          <SideMenu />
        </div>
        <div className={styles.body}>
          {/* <div>
            <select
              name="status"
              id="status"
              // value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div> */}
          <div className={styles.tableContainer}>
            <div className={styles.listCount}>
              <h3>Total Review List</h3>
              <p style={{ color: "black" }}>
                Showing <strong>{(page - 1) * limit + 1}</strong> of{" "}
                <strong>{totalReviews}</strong> bookings
              </p>
            </div>
            <table className={styles.table}>
              <thead className={styles.tablehead}>
                <tr className={styles.tablerow}>
                  {TABLE_KEYS?.[0] &&
                    TABLE_KEYS.map((key, index) => (
                      <th className={styles.th} key={index}>
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className={styles.body}>
                {reviewList.map((item, i) => {
                  return (
                    <tr key={`${item._id}`} className={styles.tablerow}>
                      <td className={styles.td}>{item?.orderId}</td>
                      <td className={styles.td}>{item?.productId?.name}</td>
                      <td className={styles.td}>{item?.userId?.name}</td>
                      <td className={styles.td}>{item?.comment}</td>
                      <td className={styles.td}>{item?.rating}⭐</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              data={reviewList}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
