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

const Purchase = ({ cart, web3, accounts, contract, contractBalance}) => {
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [stock, setStock] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [payment, setPayment] = useState(0);

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
      setPayment((prev) => (prev += item.product.price));
      return;
    }
    setSelectedItems((prev) => {
      return prev.filter((el) => el.productId !== item.productId);
    });
    setPayment((prev) => (prev -= item.product.price));
  };

  const handlePayForItems = async () => {
    try {
      await contract.methods.payForItems().send({
        from: accounts[5].address,
        value: web3.utils.toWei((payment / 200000).toString(), "ether"),
      });
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  const handleWithdrawAll = async () => {
    try {
      await contract.methods.withdrawAll().send({ from: accounts[0].address });
      toast.success("Деньги выведены на ваш счёт eth");
      console.log("Withdrawal successful");
    } catch (error) {
      console.error("Error withdrawing:", error);
    }
  };

  const purchase = async () => {
    setIsLoading(true);
    try {
      console.log(payment);
      await handlePayForItems();
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
      <div className={s["purchase__accounts"]}>
        <h3>Аккаунты</h3>
        <div className={s["purchase__account"]}>
          <h4>Владелец смарт-контракта: {accounts[0].address}</h4>
          <h4>Баланс: {accounts[0].balance} Ether</h4>
        </div>
        <div className={s["purchase__account"]}>
          <h4>Аккаунт для покупок: {accounts[5].address}</h4>
          <h4>Баланс: {accounts[5].balance} Ether</h4>
        </div>
      </div>
      <div className={s["purchase__contract"]}>
        <h3>Контракт</h3>
        <h4>{contractBalance} Ether</h4>
      </div>
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
            alignItems: "center",
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
          <Button variant={"black"} onClick={handleWithdrawAll}>
            Вывести деньги
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
