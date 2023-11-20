import React from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Divider, IconButton, SwipeableDrawer } from "@mui/material";

import s from "./XyzAnalysisDrawer.module.scss";
import XyzItem from "../XyzItem/XyzItem";

const XyzAnalysisDrawer = ({
  isXyzDrawerOpen,
  setIsXyzDraweOpen,
  analysisInfo,
}) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={isXyzDrawerOpen}
      onOpen={() => setIsXyzDraweOpen(true)}
      onClose={() => setIsXyzDraweOpen(false)}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
        },
      }}
    >
      <div className={s["xyz-analysis__header"]}>
        <IconButton onClick={() => setIsXyzDraweOpen(false)}>
          <ChevronRightIcon color="action" fontSize="large" />
        </IconButton>
        <h3 className={s["xyz-analysis__title"]}>XYZ анализ</h3>
      </div>
      <Divider sx={{ marginBottom: "25px" }} />
      <div className={s["xyz-analysis__body"]}>
        {analysisInfo.map((el, i) => (
          <XyzItem key={i} name={el.product} coef={el.coef_var} type={el.xyz} />
        ))}
      </div>
    </SwipeableDrawer>
  );
};

export default XyzAnalysisDrawer;
