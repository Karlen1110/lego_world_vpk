import React, { useState } from "react";
import Loader from "../Loader/Loader";

import s from "./InfoSales.module.scss";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Button from "../Button/Button";
import salesService from "../../services/salesService";
import { toast } from "react-toastify";

const InfoSales = ({ stock }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [infoData, setInfoData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const selectProduct = (checked, item) => {
    const formattedItem = {
      product: item.product.name,
      price: Math.floor(item.product.price * (1 + item.markup / 100)),
    };
    if (checked) {
      setSelectedItems((prev) => {
        return [...prev, formattedItem];
      });
      return;
    }
    setSelectedItems((prev) => {
      return prev.filter((el) => el.product !== item.product.name);
    });
  };

  const genOrders = async () => {
    const data = {
      count_mounth: 6,
      all_products: selectedItems,
    };
    try {
      const response = await salesService.genOrders(data);
      localStorage.setItem("orders", JSON.stringify(response));
      toast.success("Заказы были сгенерированы!");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getinfoData = async () => {
    const data = JSON.parse(localStorage.getItem("orders"));
    try {
      const response = await salesService.infoData(data);
      setInfoData(response.all_month);
      toast.success("Информация о продажах была получена!");
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s["sales"]}>
      <h3 className={s["sales__title"]}>Сервис "Информация о продажах"</h3>
      {isLoading && <Loader />}
      <div className={s["sales__content"]}>
        <FormGroup
          sx={{
            maxHeight: "400px",
            flexWrap: "nowrap",
            overflowY: "auto",
            marginBottom: "20px",
            display: "grid",
            gridTemplateColumns: "max-content max-content",
            gridTemplateRows: "auto",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <h4>Название товара:</h4>
          <h4>Стоимость:</h4>
          {stock.map((el, i) => (
            <React.Fragment key={i}>
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    onClick={(e) => selectProduct(e.target.checked, el)}
                  />
                }
                label={el.product.name}
              />
              <span className={s["sales__price"]}>
                {Math.floor(el.product.price * (1 + el.markup / 100))}
              </span>
            </React.Fragment>
          ))}
        </FormGroup>
        <div className={s["sales__buttons"]}>
          <Button variant={"black"} onClick={genOrders}>
            Генерация заказов
          </Button>
          <Button variant={"white"} onClick={getinfoData}>
            Информация о продажах
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoSales;
