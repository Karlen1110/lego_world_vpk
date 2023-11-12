import React from "react";
import s from "./Button.module.scss";

const Button = ({ children, onClick, variant, fullW }) => {
  if (variant === "white")
    return (
      <button
        style={{ width: fullW && "100%" }}
        className={`${s["btn"]} ${s["btn_white"]}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  return (
    <button
      style={{ width: fullW && "100%" }}
      className={`${s["btn"]} ${s["btn_black"]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
