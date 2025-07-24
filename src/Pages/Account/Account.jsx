import { useState } from "react";
import Header from "../../Components/Layout/Header";
import SideMenu from "../../Components/Sidemenu/Sidemenu";
import styles from "./account.module.css";
import Profile from "../../Components/Account/Profile/Profile";
import Address from "../../Components/Account/Address/Address";

const Account = () => {
  const [menu, setMenu] = useState(0);
  return (
    <div>
      <Header />
      <div className={styles.section}>
        <h1 style={{ padding: "10px" }}>Account</h1>
        <div className={styles.container}>
          <div className={styles.itemone}>
            <SideMenu setMenu={setMenu} />
          </div>
          <div className={styles.itemtwo}>
            {menu === 0 && <Profile />}
            {menu === 1 && <Address />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
