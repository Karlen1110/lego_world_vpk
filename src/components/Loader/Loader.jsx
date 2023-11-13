import React from "react";

import ReactDOM from "react-dom";

import s from "./Loader.module.scss";

import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={s["wrapper"]}>
      <CircularProgress color="inherit" size={50} />
    </div>,
    document.getElementById("loader")
  );
};

export const Spinner = () => {
  return (
    <div className={s["loader"]}>
      <CircularProgress color="inherit" size={45} />
    </div>
  );
};

export default Loader;
