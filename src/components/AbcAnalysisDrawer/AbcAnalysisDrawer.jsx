import React from "react";

import s from "./AbcAnalysisDrawer.module.scss";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Divider, IconButton, SwipeableDrawer } from "@mui/material";
import AbcItem from "../AbcItem/AbcItem";

const AbcAnalysisDrawer = ({
  isAbcDrawerOpen,
  setIsAbcDraweOpen,
  analysisInfo,
}) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={isAbcDrawerOpen}
      onOpen={() => setIsAbcDraweOpen(true)}
      onClose={() => setIsAbcDraweOpen(false)}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
        },
      }}
    >
      <div className={s["abc-analysis__header"]}>
        <IconButton onClick={() => setIsAbcDraweOpen(false)}>
          <ChevronRightIcon color="action" fontSize="large" />
        </IconButton>
        <h3 className={s["abc-analysis__title"]}>ABC анализ</h3>
      </div>
      <Divider sx={{ marginBottom: "25px" }} />
      <div className={s["abc-analysis__body"]}>
        {analysisInfo.map((el, i) => (
          <AbcItem
            key={i}
            name={el.product}
            totalPrice={el.final_price}
            part={el.part}
            type={el.abc}
          />
        ))}
      </div>
    </SwipeableDrawer>
  );
};

export default AbcAnalysisDrawer;
