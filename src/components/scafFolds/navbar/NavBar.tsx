import React from "react";
import styles from "./styles/navbar.module.css";
import Profile from "./Profile";
import Hamburger from "./Hamburger";
import IsLoggedIn from "@/global-states/zustand/IsLoggedIn";
import Link from "next/link";

type navbar = {
  isLogin: boolean;
};

const Navbar: React.FC<navbar> = ({ isLogin }) => {
  return (
    <div className={styles.navbar}>
      <Hamburger />
      <div className={styles.rightComponent}>
        <IsLoggedIn
          fallback={
            <div>
              <div>
                <Link href="/login" className={styles.loginText}>
                  login
                </Link>
              </div>
            </div>
          }
        >
          <Profile />
        </IsLoggedIn>
      </div>
    </div>
  );
};

export default Navbar;
