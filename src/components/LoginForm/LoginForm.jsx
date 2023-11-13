import React, { useState } from "react";

import s from "./LoginForm.module.scss";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    if (!validateEmail(userData.mail))
      return toast.error("Введите корректный адрес электронной почты");
    if (!userData.password) return toast.error("Введите пароль");
    try {
      setIsLoading(true);
      const response = await authService.login(userData);
      toast.success("Авторизация успешна!");
      localStorage.setItem(
        "userData",
        JSON.stringify({ userId: response.data.id, mail: response.data.mail })
      );
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <form action="" className={s["login-form"]} onSubmit={login}>
      {isLoading && <Loader />}
      <div className={s["login-form__field"]}>
        <h3 className={s["login-form__title"]}>Почта</h3>
        <input
          className={s["login-form__input"]}
          type="text"
          name="mail"
          placeholder="Введите почту..."
          onChange={onChangeInput}
        />
      </div>
      <div className={s["login-form__field"]}>
        <h3 className={s["login-form__title"]}>Пароль</h3>
        <input
          className={s["login-form__input"]}
          name="password"
          type="password"
          placeholder="Введите пароль..."
          onChange={onChangeInput}
        />
      </div>
      <Button variant="black" type="submit">
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;
