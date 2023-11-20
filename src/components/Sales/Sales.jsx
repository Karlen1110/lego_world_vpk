import React from "react";
import s from "./Sales.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SalesItem from "../SalesItem/SalesItem";

const Sales = ({ date, price, products }) => {
  return (
    <div className={s["sales"]}>
      <p className={s["sales__date"]}>
        Название: <b>{date}</b>
      </p>
      <p className={s["sales__price"]}>
        Общая сумма: <b>{price} руб.</b>
      </p>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Список продуктов</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{display: "flex", flexDirection: "column", rowGap: "20px"}}>
          {products.map((el, i) => (
            <SalesItem key={i} name={el.name} totalPrice={el.price} />
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Sales;
