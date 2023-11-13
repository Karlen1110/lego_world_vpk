import React from "react";
import s from "./Login.module.scss";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import LoginForm from "../../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={s["login"]}>
      <div className={s["login__wrapper"]}>
        <Link to={"/"}>
          <div className={s["logo"]}>
            <ArrowBackIcon />
            <h3 className={s["logo__title"]}>Lego World</h3>
          </div>
        </Link>
        <h2 className={s["login__title"]}>Вход</h2>
        <LoginForm />
        <Link to={'/registration'}>
          <span className={s["login__redirect"]}>Зарегистрироваться</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
