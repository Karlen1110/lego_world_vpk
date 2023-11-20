import React from "react";

import s from "./AbcItem.module.scss";

const AbcItem = ({ name, totalPrice, type, part }) => {
  return (
    <div className={s["abc-item"]}>
      <p>
        Название: <b>{name}</b>
      </p>
      <p>
        Общая выручка: <b>{totalPrice}</b>
      </p>
      <p>
        Процент от общего числа продаж: <b>{part?.toFixed(2)} %</b>
      </p>
      <p>
        Тип (A B C): <b>{type}</b>
      </p>
    </div>
  );
};

export default AbcItem;
