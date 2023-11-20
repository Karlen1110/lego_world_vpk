import React from "react";

import s from "./SalesItem.module.scss";

const SalesItem = ({ name, totalPrice }) => {
  return (
    <div className={s["sales-item"]}>
      <p className={s["sales-item__name"]}>
        Название: <b>{name}</b>
      </p>
      <p className={s["sales-item__total-price"]}>
        Общая сумма: <b>{totalPrice} руб.</b>
      </p>
    </div>
  );
};

export default SalesItem;
