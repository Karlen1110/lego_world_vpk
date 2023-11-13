import React from "react";
import s from "./Search.module.scss";

import SearchIcon from "@mui/icons-material/Search";

const Search = ({ products, setFiltredProducts }) => {
  const onChangeInput = (e) => {
    const { value } = e.target;
    const allProducts = products;
    setFiltredProducts(
      allProducts.filter((el) =>
        el.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className={s["search"]}>
      <SearchIcon sx={{ color: "#00000066" }} />
      <input
        className={s["search__input"]}
        type="text"
        placeholder="Напишите название товара..."
        onChange={onChangeInput}
      />
    </div>
  );
};

export default Search;
