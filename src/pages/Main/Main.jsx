import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import { Spinner } from "../../components/Loader/Loader";

import s from "./Main.module.scss";
import { toast } from "react-toastify";
import productService from "../../services/productService";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userData")));
  const [filtredProducts, setFiltredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  const getProducts = async () => {
    setIsLoadingProducts(true);
    const params = { type: "lego" };
    try {
      const response = await productService.getProducts(params);
      setProducts(response);
      setFiltredProducts(response);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const getCart = useCallback(async () => {
    if (userInfo === null) return;
    setIsLoadingCart(true);
    const params = { id: userInfo.userId };
    try {
      const response = await productService.getCart(params);
      setCart(response);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoadingCart(false);
    }
  }, [userInfo]);

  useEffect(() => {
    getProducts();
    getCart();
  }, [getCart]);

  if (isLoadingProducts || isLoadingCart) return <Spinner />;

  return (
    <div className={s["main"]}>
      <Header
        products={products}
        setFiltredProducts={setFiltredProducts}
        search
      />
      <div className={s["container"]}>
        <div className={s["main__content"]}>
          {filtredProducts.map((item, i) => (
            <Card
              key={i}
              id={item.id}
              name={item.name}
              price={item.price}
              img={`/img${item.picture_path}`}
              cart={cart}
              setCart={setCart}
              userId={userInfo?.userId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
