import React from "react";
import s from "./Search.module.scss";

import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <div className={s["search"]}>
      <SearchIcon sx={{color: "#00000066"}}/>
      <input className={s["search__input"]} type="text" placeholder="Напишите название товара..." />
    </div>
  );
};

export default Search;
