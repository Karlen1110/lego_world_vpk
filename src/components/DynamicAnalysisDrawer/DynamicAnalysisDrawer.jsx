import React from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Divider, IconButton, SwipeableDrawer } from "@mui/material";

import s from "./DynamicAnalysisDrawer.module.scss";

const DynamicAnalysisDrawer = ({
  isDynamicDrawerOpen,
  setIsDynamicDraweOpen,
  dynamicInfo,
}) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={isDynamicDrawerOpen}
      onOpen={() => setIsDynamicDraweOpen(true)}
      onClose={() => setIsDynamicDraweOpen(false)}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
        },
      }}
    >
      <div className={s["dynamic-analysis__header"]}>
        <IconButton onClick={() => setIsDynamicDraweOpen(false)}>
          <ChevronRightIcon color="action" fontSize="large" />
        </IconButton>
        <h3 className={s["dynamic-analysis__title"]}>Анализ динамики продаж</h3>
      </div>
      <Divider sx={{ marginBottom: "25px" }} />
      <div className={s["dynamic-analysis__body"]}>
        <p className={s["dynamic-analysis__name"]}>
          Динамика: <b>{dynamicInfo.dynamic?.toFixed(2)} %</b>
        </p>
        <p className={s["stock-item__quantity"]}>
          Информация: <b>{dynamicInfo.some_info}</b>
        </p>
      </div>
    </SwipeableDrawer>
  );
};

export default DynamicAnalysisDrawer;
