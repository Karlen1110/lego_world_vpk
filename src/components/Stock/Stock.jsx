import React from "react";
import s from "./Stock.module.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Divider, IconButton, SwipeableDrawer } from "@mui/material";
import StockItem from "../StockItem/StockItem";

const Stock = ({ isStockOpen, setIsStockOpen, stock }) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={isStockOpen}
      onOpen={() => setIsStockOpen(true)}
      onClose={() => setIsStockOpen(false)}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
        },
      }}
    >
      <div className={s["stock__header"]}>
        <IconButton onClick={() => setIsStockOpen(false)}>
          <ChevronRightIcon color="action" fontSize="large" />
        </IconButton>
        <h3 className={s["stock__title"]}>Склад</h3>
      </div>
      <Divider sx={{ marginBottom: "25px" }} />
      <div className={s["stock__body"]}>
        {stock.map((el, i) => (
          <StockItem
            key={i}
            name={el.product.name}
            quantity={el.quantity}
            markup={el.markup}
          />
        ))}
      </div>
    </SwipeableDrawer>
  );
};

export default Stock;
