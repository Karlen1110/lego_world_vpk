import React from "react";
import s from "./StockItem.module.scss";

const StockItem = ({ name, quantity, markup }) => {
  return (
    <div className={s["stock-item"]}>
      <p className={s["stock-item__name"]}>Название: <b>{name}</b></p>
      <p className={s["stock-item__quantity"]}>Количество: <b>{quantity}</b></p>
      <p className={s["stock-item__markup"]}>Наценка: <b>{markup} %</b></p>
    </div>
  );
};

export default StockItem;
