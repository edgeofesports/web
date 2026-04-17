"use server";
import React from "react";
import styles from "./page.module.css";
// import Titles from '@/components/temp/Titles'
import RegisterFrom from "./components/RegisterFrom";
import { registerFormAction } from "./api/route";
import SignupPage from "./components/SignUpFrom";

const page = async () => {
  return (
    <div className={styles.pages}>
      {/* <Titles title='Register' /> */}
      {/* <Register registerFunction={registerUser} /> */}
      <div>
        {/* <RegisterFrom formAction={registerFormAction} /> */}
        {/* <SignupFlow /> */}
        <SignupPage />
      </div>
    </div>
  );
};

export default page;
