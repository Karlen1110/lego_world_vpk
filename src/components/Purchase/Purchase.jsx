import React, { useState } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import s from "./Purchase.module.scss";
import Button from "../Button/Button";
import Stock from "../Stock/Stock";
import stockService from "../../services/stockService";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import productService from "../../services/productService";

const Purchase = ({ cart }) => {
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [stock, setStock] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStockItems = async () => {
    setIsLoading(true);
    const params = { type: "lego" };
    try {
      const stockItems = await stockService.getStock(params);
      setStock(stockItems);
      setIsStockOpen(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const selectProduct = (checked, item) => {
    const formattedItem = {
      quantity: item.quantity,
      markup: 0,
      userId: item.userId,
      productId: item.productId,
    };

    if (checked) {
      setSelectedItems((prev) => {
        return [...prev, formattedItem];
      });
      return;
    }
    setSelectedItems((prev) => {
      return prev.filter((el) => el.productId !== item.productId);
    });
  };

  const purchase = async () => {
    setIsLoading(true);
    try {
      await productService.purchase(selectedItems);
      toast.success("Покупка прошла успешно!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s["purchase"]}>
      <h3 className={s["purchase__title"]}>Сервис "Оприходование товара"</h3>
      {isLoading && <Loader />}
      <Stock
        isStockOpen={isStockOpen}
        setIsStockOpen={setIsStockOpen}
        stock={stock}
      />
      <div className={s["purchase__content"]}>
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
            alignItems: "center"
          }}
        >
          <h4>Название товара:</h4>
          <h4>Количество:</h4>
          {cart.map((el, i) => (
            <React.Fragment key={i}>
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={(e) => selectProduct(e.target.checked, el)}
                  />
                }
                label={el.product.name}
              />
              <span className={s["purchase__quantity"]}>1 шт.</span>
            </React.Fragment>
          ))}
        </FormGroup>
        <div className={s["purchase__buttons"]}>
          <Button variant={"black"} onClick={purchase}>
            Покупка
          </Button>
          <Button variant={"white"} onClick={getStockItems}>
            Проверить склад
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
