import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Card from "../../components/Card/Card";
import { Spinner } from "../../components/Loader/Loader";

import s from "./Main.module.scss";
import { toast } from "react-toastify";
import productService from "../../services/productService";
import { Button } from "@mui/material";

import XMLParser from "react-xml-parser";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userData")));
  const [filtredProducts, setFiltredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  const navigate = useNavigate();

  const getProducts = async () => {
    setIsLoadingProducts(true);
    const params = { type: "lego" };
    try {
      const response = await productService.getProducts(params);
      setProducts(response);
      setFiltredProducts(response);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const getCart = useCallback(async () => {
    if (userInfo === null) return;
    setIsLoadingCart(true);
    const params = { id: userInfo.userId };
    try {
      const response = await productService.getCart(params);
      setCart(response);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoadingCart(false);
    }
  }, [userInfo]);

  const readFile = (file) => {
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = async function () {
      const xml = new XMLParser().parseFromString(reader.result);
      const json = xml.children.map((el) => {
        const objItem = {};
        el.children.forEach((el) => {
          if (el.name === "price") return (objItem[el.name] = Number(el.value));
          objItem[el.name] = el.value;
        });
        return objItem;
      });
      await productService.addProducts(json);
      navigate(0);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToJson = (e) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(products),
      fileName: "products.json",
      fileType: "text/json",
    });
  };

  useEffect(() => {
    getProducts();
    getCart();
  }, [getCart]);

  if (isLoadingProducts || isLoadingCart) return <Spinner />;

  return (
    <div className={s["main"]}>
      <Header
        products={products}
        setFiltredProducts={setFiltredProducts}
        search
      />
      <div className={s["container"]}>
        <div className={s["main__files"]}>
          <h3>Импорт/Экспорт</h3>
          <div className={s["main__files-btn"]}>
            <Button
              component="label"
              className={s["main__upload-black"]}
              onChange={(e) => readFile(e.target.files[0])}
            >
              Импорт
              <input type="file" hidden />
            </Button>
            <Button className={s["main__upload-white"]} onClick={exportToJson}>
              Экспорт
            </Button>
          </div>
        </div>
        <div className={s["main__content"]}>
          {filtredProducts.map((item, i) => (
            <Card
              key={i}
              id={item.id}
              name={item.name}
              price={item.price}
              img={`/img${item.picture_path}`}
              cart={cart}
              setCart={setCart}
              userId={userInfo?.userId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
