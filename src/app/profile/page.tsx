"use client";
import React from "react";
import styles from "./page.module.css";
import AuthProtected from "@/components/auth/AuthProtected";
import Header from "@/components/profile/Header";
import UserProfile from "@/components/profile/UserProfile";
import Balance from "@/components/profile/Balance";
import PersonalInfo from "@/components/profile/PersonalInfo";
import PasswordSecurity from "@/components/profile/PasswordAndSequrity";
import { createNewPassword, getPersonalInfo } from "@/api/user";
import Leaderboard from "@/components/profile/Leaderboard";
import Logout from "@/components/profile/Logout";
import { ConfirmationDialogProvider } from "@/components/ConfirmDialog/ConfirmDialog";
import IsLoggedIn from "@/global-states/zustand/IsLoggedIn";
import { useAuth } from "@/global-states/zustand/auth";

const page = () => {
  const user = useAuth((state) => state.user);
  // if(!user) return (
  //   <div>User not found</div>
  // )
  const { balance, name, ffUid, email, profile, userName, ffUserName } = user;
  return (
    <IsLoggedIn fallback={<div>Loading...</div>}>
      <div className={styles.profile}>
        <Header userName={userName} />
        <div className={styles.section1}>
          <UserProfile
            style={{ marginTop: 20 }}
            name={name}
            uid={ffUid}
            profile={profile}
          />
          {/* <SocialMedia /> */}
          <Balance balance={(Math.round(balance * 100) / 100)} style={{ marginTop: 35 }} />
        </div>
        <Leaderboard ffUid={ffUid} ffusername={ffUserName} />
        <div className={styles.section2}>
          <PersonalInfo
            style={{ marginTop: 35 }}
            name={name}
            ffUid={ffUid}
            email={email}
            userName={userName}
          />
        </div>
        <PasswordSecurity authorization={"token"} createNewPassword={createNewPassword} style={{ marginTop: 35 }} />
        <ConfirmationDialogProvider>
          <Logout />
        </ConfirmationDialogProvider>
      </div>
    </IsLoggedIn>
  );
};

export default page;
