import React, { useEffect, useState } from "react";
import style from "./booking.module.css";
import Header from "../../../Components/Layout/Header";
import SideMenu from "../../../Components/Admin/Sidemenu/Sidemenu";
import { axiosInstanceV1 } from "../../../Utils/ApiServices";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LIMIT } from "../../../Constants/Constant";
import Pagination from "../../../Components/Admin/Pagination/Pagination";
const Bookings = () => {
 
  const TABLE_KEYS = [
    "Product Name",
    "User",
    "Quantity",
    "Total Price",
    "Booking Date",
    "Status",
    "Action",
  ];
  const [totalPages, setTotalPages] = useState(null);
  const [limit, setLimit] = useState(10);
  const [totalBookings, setTotalBookings] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromUrl);
  const [bookingList, setBookingList] = useState([]);
  const [status, setStatus] = useState("");

  const fetchBookingList = async (status = "") => {
    const qP = new URLSearchParams();
    qP.append("limit", LIMIT);
    qP.append("page", page);
    status !== "" && qP.append("status", status);
    try {
      const response = await axiosInstanceV1.get(`/booking?${qP.toString()}`);
      if (response.status == 200) {
        setBookingList(response.data.bookingList);
        setTotalPages(response.data.totalPages);
        setLimit(response.data.limit);
        setTotalBookings(response.data.totalBookings);
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
    fetchBookingList(status);
    setSearchParams({ page });
  }, [page, status]);
  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.sidemenu}>
          <SideMenu />
        </div>
        <div className={style.body}>
          <div>
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
          </div>
          <div className={style.tableContainer}>
            <div className={style.listCount}>
              <h3>Total Booking List</h3>
              <p>
                Showing <strong>{(page - 1) * limit + 1}</strong> of{" "}
                <strong>{totalBookings}</strong> bookings
              </p>
            </div>
            <table className={style.table}>
              <thead className={style.tablehead}>
                <tr className={style.tablerow}>
                  {TABLE_KEYS?.[0] &&
                    TABLE_KEYS.map((key, index) => (
                      <th className={style.th} key={index}>
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className={style.body}>
                {bookingList.map((booking, i) =>
                  booking.products.map((item, j) => (
                    <tr
                      key={`${booking._id}-${item._id}`}
                      className={style.tablerow}
                    >
                      <td className={style.td}>{item.product?.name}</td>
                      <td className={style.td}>{booking?.userId?.name}</td>
                      <td className={style.td}>{item?.quantity}</td>
                      <td className={style.td}>Rs.{booking?.totalPrice}</td>
                      <td className={style.td}>
                        {booking?.createdAt?.split("T")[0]}
                      </td>
                      <td
                        className={`${style.td} ${
                          style[item?.status?.toLowerCase()] || ""
                        }`}
                      >
                        {item?.status?.charAt(0).toUpperCase() +
                          item?.status?.slice(1).toLowerCase()}
                      </td>
                      <td
                        className={style.td}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleEditBooking(booking._id, item._id, booking)
                        }
                      >
                        Edit
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination
              data={bookingList}
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

export default Bookings;
