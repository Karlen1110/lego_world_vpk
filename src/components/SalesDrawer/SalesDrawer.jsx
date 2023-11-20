import React from "react";

import { Divider, IconButton, SwipeableDrawer } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import s from "./SalesDrawer.module.scss";
import Sales from "../Sales/Sales";

const SalesDrawer = ({ isSalesOpen, setIsSalesOpen, sales }) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={isSalesOpen}
      onOpen={() => setIsSalesOpen(true)}
      onClose={() => setIsSalesOpen(false)}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
        },
      }}
    >
      <div className={s["sales-drawer__header"]}>
        <IconButton onClick={() => setIsSalesOpen(false)}>
          <ChevronRightIcon color="action" fontSize="large" />
        </IconButton>
        <h3 className={s["sales-drawer__title"]}>Продажи</h3>
      </div>
      <Divider sx={{ marginBottom: "25px" }} />
      <div className={s["sales-drawer__body"]}>
        {sales.map((el, i) => (
          <Sales
            key={i}
            date={el.date}
            price={el.final_price_for_all_products}
            products={el.final_price_for_product}
          />
        ))}
      </div>
    </SwipeableDrawer>
  );
};

export default SalesDrawer;
