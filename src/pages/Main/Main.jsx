import React from "react";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";

import s from "./Main.module.scss";

const Main = () => {
  return (
    <div className={s["main"]}>
      <Header />
      <div className={s["main__content"]}>
        <Card
          name="Конструктор LEGO Star Wars Микрофайтер Истребителя Мандалорца"
          price="1714"
          img="/img/lego1.png"
        />
        <Card
          name="Конструктор LEGO Star Wars База повстанцев Явин-4"
          price="17664"
          img="/img/lego2.png"
        />
        <Card
          name="Конструктор LEGO City Fire Штаб-квартира спасательных транспортных средств"
          price="5728"
          img="/img/lego3.png"
        />
      </div>
    </div>
  );
};

export default Main;
