import React, { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import Header from "../../Components/Layout/Header";
import styles from "./order.module.css";
import OrderCard from "../../Components/Order/OrderCard";
import OrderFilters from "../../Components/Orders/OrderFilters";
import Search from "../../Components/Search/Search";
import { useSearchParams } from "react-router-dom";

const Order = () => {
  const [status, setStatus] = useState("");
  const [year, setYear] = useState("");
  const [availableYear, setAvailableYear] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [bD, setBd] = useState(false);

  useEffect(() => {
    const params = {};
    if (status) params.status = status;
    if (year) params.year = year;
    setSearchParams(params);
  }, [year, status]);
  // console.log(availableYear);

  return (
    <div>
      <Header />
      <div className={styles.order}>
        <div className={styles.filters}>
          <OrderFilters
            status={status}
            year={year}
            setStatus={setStatus}
            setYear={setYear}
            availableYears={availableYear}
            bD={bD}
            setBd={setBd}
          />
        </div>
        <div className={styles.orderContainer}>
         
          <div className={styles.orderCard}>
            <OrderCard
              status={status}
              year={year}
              setAvailableYear={setAvailableYear}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
