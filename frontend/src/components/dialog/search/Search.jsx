import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ ...props }) => {
  const { onClose, mobile, multiSelect, selectedProducts, handleSave } = props;

  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");
  const { data: filters, isLoading: filtersLoading } = useQuery(
    ["get-search-filters"],
    () => api.getSearchFilters()
  );
  const { mutate, isLoading } = useMutation("search", api.search, {
    onSuccess: (data) => {
      setstate({ ...state, ...data });
    },
  });

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
          setState({ ...state, initialized: true });
        }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment>
              {isLoading ? (
                <CircularProgress
                  sx={{ width: "24px !important", height: "24px !important" }}
                />
              ) : (
                <SearchIcon />
              )}
            </InputAdornment>
          ),
        }}
        sx={{
          ...(mobile && {
            position: "sticky",
            top: 0,
            zIndex: 1,
            bgcolor: "background.paper",
          }),
        }}
      />
    </>
  );
};

export default Search;
