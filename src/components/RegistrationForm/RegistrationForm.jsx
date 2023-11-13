import React, { useState } from "react";
import s from "./RegistrationForm.module.scss";

import { toast } from "react-toastify";

import Button from "../Button/Button";
import Loader from "../Loader/Loader";

import { validateEmail } from "../../utils/index";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

const RegistrationForm = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    if (!userData.name) return toast.error("Введите своё имя");
    if (!userData.surname) return toast.error("Введите свою фамилию");
    if (!validateEmail(userData.mail))
      return toast.error("Введите корректный адрес электронной почты");
    if (userData.password !== userData.rPassword)
      return toast.error("Введённые пароли не совпадают");
    if (userData.password.length < 6)
      return toast.error("Длина пароля должна быть больше 6 символов");
    try {
      setIsLoading(true);
      const response = await authService.register(userData);
      console.log(response.status);
      toast.success("Регистрация успешна!");
      localStorage.setItem("isAuth", true);
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
    <form action="" className={s["registration-form"]} onSubmit={register}>
      {isLoading && <Loader />}
      <div className={s["registration-form__field"]}>
        <h3 className={s["registration-form__title"]}>Имя</h3>
        <input
          className={s["registration-form__input"]}
          type="text"
          placeholder="Введите имя..."
          name="name"
          onChange={onChangeInput}
        />
      </div>
      <div className={s["registration-form__field"]}>
        <h3 className={s["registration-form__title"]}>Фамилия</h3>
        <input
          className={s["registration-form__input"]}
          type="text"
          placeholder="Введите фамилию..."
          name="surname"
          onChange={onChangeInput}
        />
      </div>
      <div className={s["registration-form__field"]}>
        <h3 className={s["registration-form__title"]}>Почта</h3>
        <input
          className={s["registration-form__input"]}
          type="text"
          placeholder="Введите почту..."
          name="mail"
          onChange={onChangeInput}
        />
      </div>
      <div className={s["registration-form__field"]}>
        <h3 className={s["registration-form__title"]}>Пароль</h3>
        <input
          className={s["registration-form__input"]}
          type="password"
          placeholder="Введите пароль..."
          name="password"
          onChange={onChangeInput}
        />
      </div>
      <div className={s["registration-form__field"]}>
        <h3 className={s["registration-form__title"]}>Повторите пароль</h3>
        <input
          className={s["registration-form__input"]}
          type="password"
          placeholder="Введите пароль повторно..."
          name="rPassword"
          onChange={onChangeInput}
        />
      </div>
      <Button variant="black" type="submit">
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default RegistrationForm;
