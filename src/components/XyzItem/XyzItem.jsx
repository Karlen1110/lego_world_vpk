import React from "react";

import s from "./XyzItem.module.scss";

const XyzItem = ({ name, coef, type }) => {
  return (
    <div className={s["xyz-item"]}>
      <p>
        Название: <b>{name}</b>
      </p>
      <p>
        Коэффициент вариативности: <b>{coef?.toFixed(2)} %</b>
      </p>
      <p>
        Тип (X Y Z): <b>{type}</b>
      </p>
    </div>
  );
};

export default XyzItem;
