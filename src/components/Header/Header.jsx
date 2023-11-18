import React from "react";
import s from "./Header.module.scss";
import Search from "../Search/Search";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ products, setFiltredProducts, search }) => {
  const isAuth = !!localStorage.getItem("userData");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userData");
    navigate(0);
  };

  return (
    <header className={s["header"]}>
      <div className={s["container"]}>
        <div className={s["header__row"]}>
          <Link to={'/'}>
            <h1 className={s["header__shop-title"]}>Lego World</h1>
          </Link>
          {search && (
            <Search
              products={products}
              setFiltredProducts={setFiltredProducts}
            />
          )}
          <div className={s["header__buttons"]}>
            {isAuth ? (
              <>
                <Link to={"/profile"}>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
