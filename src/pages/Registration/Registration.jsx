import React from "react";
import s from "./Registration.module.scss";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className={s["registration"]}>
      <div className={s["registration__wrapper"]}>
        <Link to={"/"}>
          <div className={s["logo"]}>
            <ArrowBackIcon />
            <h3 className={s["logo__title"]}>Lego World</h3>
          </div>
        </Link>
        <h2 className={s["registration__title"]}>Регистрация</h2>
        <RegistrationForm />
        <Link to={'/login'}>
          <span className={s["registration__redirect"]}>Войти</span>
        </Link>
      </div>
    </div>
  );
};

export default Registration;
