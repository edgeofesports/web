'use client'
import React, { use } from "react";
import styles from "./styles/profileSection.module.css";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/global-states/zustand/auth";

type profileSection = {
  name: string;
  ffUid: string;
  userName: string;
  profileSrc: string;
};

const ProfileSection: React.FC<profileSection> = (
  {
    // name,
    // ffUid,
    // userName,
    // profileSrc,
  }
) => {
  const isAuthneticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);
  if (!isAuthneticated) {
    return (
      <div className={styles.profile}>
        <div className={styles.loginContainer}>
          <Link className={styles.loginLink} href="/login">
            {" "}
            <Image unoptimized height={30} width={30} alt="" src={"/icons/welcome-back.png"} />&nbsp;
            Login{" "}
          </Link>
        </div>
      </div>
    );
  }

  // const { name, userName, ffUid, profileSrc } = decodeduser;
  return (
    <div className={styles.profile}>
      {user.name ? (
        <Link href="/profile" className={styles.linkContainer}>
          <div className={styles.profilePic}>
            <Image unoptimized height={60} width={60} alt="" src={"/men.png"} />
            {/* <img src="/men.png" alt="" /> */}
          </div>
          <div className={styles.identity}>
            <div className={styles.name}>{user.userName}</div>
            <div className={styles.uid}>{user.ffUid}</div>
          </div>
        </Link>
      ) : (
        <div className={styles.loginContainer}>
          <Link className={styles.loginLink} href="/login">
            {" "}
            <Image height={30} width={30} alt="" src={"/icons/welcome-back.png"} />&nbsp;
            Login{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
