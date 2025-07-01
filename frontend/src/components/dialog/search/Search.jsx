import { TextField } from "@mui/material";
import React, { useState } from "react";

const Search = ({ ...props }) => {
  const { onClose, mobile, multiSelect, selectedProducts, handleSave } = props;

  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");

  const [state, setState] = useState({
    products: [],
    selected: selectedProducts || [],
    initialized: false,
    category: "",
    subCategory: "",
    shop: "",
  });

  const onKeyDown = (e) => {
    if (e.keyCode == "38" || e.keyCode == "40") {
      setFocus(false);
    }
  };
  return (
    <>
      <TextField
        id="standard-basic"
        variant="standard"
        placeholder="Search products"
        onFocus={() => setFocus(true)}
        onKeyDown={onKeyDown}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </>
  );
};

export default Search;
