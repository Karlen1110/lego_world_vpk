import React from "react";
import s from "./Header.module.scss";
import Search from "../Search/Search";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const isAuth = !!localStorage.getItem("isAuth");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAuth");
    navigate(0);
  };

  return (
    <header className={s["header"]}>
      <h1 className={s["header__shop-title"]}>Lego World</h1>
      <Search />
      <div className={s["header__buttons"]}>
        {isAuth ? (
          <>
            <Link to={"/account"}>
              <Button variant="white">Личный кабинет</Button>
            </Link>
            <Button variant="black" onClick={logout}>
              Выйти
            </Button>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <Button variant="white">Войти</Button>
            </Link>
            <Link to={"/registration"}>
              <Button variant="black">Зарегистрироваться</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
