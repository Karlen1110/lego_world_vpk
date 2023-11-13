import React from "react";
import s from "./Card.module.scss";
import Button from "../Button/Button";

const Card = ({ name, price, img }) => {
  return (
    <div className={s["card"]}>
      <div className={s["card__img"]}>
        <img className={s["card__img"]} src={img} alt="lego" />
      </div>
      <p className={s["card__name"]}>{name}</p>
      <p className={s["card__price"]}>P {price}</p>
      <Button fullW variant="black">
        Добавить в корзину
      </Button>
    </div>
  );
};

export default Card;
