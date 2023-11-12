import React from "react";
import s from "./Header.module.scss";
import Search from "../Search/Search";
import Button from "../Button/Button";

const Header = () => {
  return (
    <header className={s["header"]}>
      <h1 className={s["header__shop-title"]}>Lego World</h1>
      <Search />
      <div className={s["header__buttons"]}>
        <Button variant="white">Войти</Button>
        <Button variant="black">Зарегистрироваться</Button>
      </div>
    </header>
  );
};

export default Header;
