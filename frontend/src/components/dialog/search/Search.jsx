import {
  CircularProgress,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useMutation, useQuery } from "react-query";

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  fontSize: 12,
  fontWeight: 600,
  lineHeight: 1,
}));

const Search = ({ ...props }) => {
  const { onClose, mobile, multiSelect, selectedProducts, handleSave } = props;

  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");
  // const { data: filters, isLoading: filtersLoading } = useQuery(
  //   ["get-search-filters"],
  //   () => api.getSearchFilters()
  // );
  // const { mutate, isLoading } = useMutation("search", api.search, {
  //   onSuccess: (data) => {
  //     setState({ ...state, ...data });
  //   },
  // });

  const filters = [
    {
      title: "Product 1",
    },
  ];

  const filtersLoading = true;

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
              {/* {isLoading ? (
                <CircularProgress
                  sx={{ width: "24px !important", height: "24px !important" }}
                />
              ) : (
                <SearchIcon />
              )} */}
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
          "& .MuiInput-root": {
            height: { lg: 72, md: 72, sm: 72, xs: 56 },
          },
          "& .MuiInputAdornment-root": {
            width: 100,
            mr: 0,
            svg: {
              mx: "auto",
              color: "primary.main",
            },
          },
        }}
      />
      <Stack gap={1} direction="row" p={1}>
        <FormControl fullWidth>
          <LabelStyle component={"label"} htmlFor="shops">
            Shop
          </LabelStyle>
          {filtersLoading ? (
            <Skeleton variant="rounded" height={40} width="100%" />
          ) : (
            <Select
              id="shops"
              size="small"
              labelId="demo-simple-select-label"
              value={state.shop}
              onChange={(e) => setState({ ...state, shop: e.target.value })}
            >
              <MenuItem value="">None</MenuItem>
              {filters?.shops.map((shop) => (
                <MenuItem>{shop.title}</MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
        <FormControl fullWidth>
          <LabelStyle component={"label"} htmlFor="category">
            Category
          </LabelStyle>
          {filtersLoading ? (
            <Skeleton variant="rounded" height={40} width="100%" />
          ) : (
            <Select
              id="category"
              size="small"
              labelId="demo-simple-select-label"
              value={state.category}
              onChange={(e) =>
                setstate({
                  ...state,
                  category: e.target.value,
                  subCategory: "",
                })
              }
            >
              <MenuItem value="">None</MenuItem>
              {filters?.categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
        sdajasas
      </Stack>
    </>
  );
};

export default Search;
