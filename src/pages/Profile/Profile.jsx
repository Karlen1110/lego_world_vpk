import React, { useCallback, useEffect, useState } from "react";
import s from "./Profile.module.scss";
import Header from "../../components/Header/Header";
import productService from "../../services/productService";
import { toast } from "react-toastify";
import { Spinner } from "../../components/Loader/Loader";
import Purchase from "../../components/Purchase/Purchase";
import MarkUp from "../../components/MarkUp/MarkUp";
import stockService from "../../services/stockService";
import InfoSales from "../../components/InfoSales/InfoSales";
import AnalysisData from "../../components/AnalysisData/AnalysisData";

const Profile = () => {
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userData")));
  const [cart, setCart] = useState([]);
  const [stock, setStock] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCart = useCallback(async () => {
    if (userInfo === null) return;
    setIsLoading(true);
    const params = { id: userInfo.userId };
    try {
      const response = await productService.getCart(params);
      setCart(response);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }, [userInfo]);

  const getStockItems = async () => {
    setIsLoading(true);
    const params = { type: "lego" };
    try {
      const stockItems = await stockService.getStock(params);
      setStock(stockItems);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart();
    getStockItems();
  }, [getCart]);

  if (isLoading) return <Spinner />;

  return (
    <div className={s["profile"]}>
      <Header />
      <div className={s["container"]}>
        <Purchase cart={cart} />
        <MarkUp stock={stock} />
        <InfoSales stock={stock} />
        <AnalysisData />
      </div>
    </div>
  );
};

export default Profile;
