import React, { useState } from "react";
import s from "./MarkUp.module.scss";
import Loader from "../Loader/Loader";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import markUpService from "../../services/markUpService";

const MarkUp = ({ stock }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const selectProduct = (checked, item) => {
    const formattedItem = {
      Id: item.id,
      markup: item.markup,
    };
    if (checked) {
      setSelectedItems((prev) => {
        return [...prev, formattedItem];
      });
      return;
    }
    setSelectedItems((prev) => {
      return prev.filter((el) => el.id !== item.id);
    });
  };

  const changeMarkUp = (id, value) => {
    setSelectedItems((prev) =>
      prev.map((el) => {
        if (el.Id === id) return { ...el, markup: Number(value) };
        return el;
      })
    );
  };

  const markUpItems = async () => {
    setIsLoading(true);
    try {
      await markUpService.markUp(selectedItems);
      toast.success("Наценка была изменена!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s["mark-up"]}>
      <h3 className={s["mark-up__title"]}>Сервис "Наценка товара"</h3>
      {isLoading && <Loader />}
      <div className={s["mark-up__content"]}>
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
          <h4>Наценка:</h4>
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
              <input
                className={s["mark-up__input"]}
                type="number"
                onChange={(e) => changeMarkUp(el.id, e.target.value)}
              />
            </React.Fragment>
          ))}
        </FormGroup>
        <div className={s["mark-up__buttons"]}>
          <Button variant={"black"} onClick={markUpItems}>Наценить</Button>
        </div>
      </div>
    </div>
  );
};

export default MarkUp;
