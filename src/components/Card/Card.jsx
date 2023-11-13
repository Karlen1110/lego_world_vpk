import React, { useState } from "react";
import s from "./Card.module.scss";
import Button from "../Button/Button";
import productService from "../../services/productService";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const Card = ({ id, name, price, img, cart, setCart, userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const cartElem = cart.find((el) => el.productId === id);

  const navigate = useNavigate();

  const addProductToCart = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }
    const data = { userId, productId: id };
    setIsLoading(true);
    try {
      const newCartElem = await productService.addToCart(data);
      setCart((prev) => {
        return [...prev, newCartElem];
      });
      toast.success("Товар успешно добавлен в корзину!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProductFromCart = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }
    setIsLoading(true);
    try {
      await productService.deleteFromCart(cartElem.id);
      setCart((prev) => {
        return prev.filter((el) => el.id !== cartElem.id);
      });
      toast.success("Товар удален из корзины!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s["card"]}>
      {isLoading && <Loader />}
      <div className={s["card__img"]}>
        <img className={s["card__img"]} src={img} alt="lego" />
      </div>
      <p className={s["card__name"]}>{name}</p>
      <p className={s["card__price"]}>P {price}</p>
      {!!cartElem ? (
        <Button fullW variant="white" onClick={deleteProductFromCart}>
          Удалить из корзины
        </Button>
      ) : (
        <Button fullW variant="black" onClick={addProductToCart}>
          Добавить в корзину
        </Button>
      )}
    </div>
  );
};

export default Card;
