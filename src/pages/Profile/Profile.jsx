import React from "react";
import s from "./Profile.module.scss";

const Profile = () => {
  return (
    <div className={s["profile"]}>
      <div className={s["content"]}>
        <div className={s["profile__test-block"]}></div>
      </div>
    </div>
  );
};

export default Profile;
