import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  InputAdornment,
  ListItemIcon,
  MenuItem,
  MenuList,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useMutation, useQuery } from "react-query";
import NoDataFound from "@/illustrations/dataNotFound";

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

  const handleListItemClick = (prop) => {
    if (multiSelect) {
      const matched = state.selected.filter((v) => prop._id === v._id);
      const notMatched = state.selected.filter((v) => prop._id !== v._id);
      if (Boolean(matched.length)) {
        setState({ ...state, selected: notMatched });
      } else {
        setState({ ...state, selected: [...state.selected, prop] });
      }
    } else {
      !mobile && onClose(prop);
      router.push(`/product/${prop}`);
    }
  };

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

  const isLoading = false;

  const filters = [
    {
      title: "Product 1",
    },
  ];

  const filtersLoading = false;

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
              {/* {filters?.shops.map((shop) => (
                <MenuItem>{shop.title}</MenuItem>
              ))} */}
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
                setState({
                  ...state,
                  category: e.target.value,
                  subCategory: "",
                })
              }
            >
              <MenuItem value="">None</MenuItem>
              {/* {filters?.categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))} */}
            </Select>
          )}
        </FormControl>
        <FormControl fullWidth>
          <LabelStyle component={"label"} htmlFor="subCategory">
            SubCategory
          </LabelStyle>
          {filtersLoading ? (
            <Skeleton variant="rounded" height={40} width="100%" />
          ) : (
            <Select
              disabled={!Boolean(state.category)}
              id="subCategory"
              size="small"
              labelId="demo-simple-select-label"
              value={state.subCategory}
              onChange={(e) =>
                setState({ ...state, subCategory: e.target.value })
              }
            >
              <MenuItem value="">None</MenuItem>
              {/* {filters?.categories
                .find((cat) => cat._id === state.category)
                ?.subCategories.map((subcat) => (
                  <MenuItem value={subcat._id} key={subcat._id}>
                    {subcat.name}
                  </MenuItem>
                ))} */}
            </Select>
          )}
        </FormControl>
      </Stack>
      <Divider />
      <Box className="scroll-main">
        <Box sx={{ height: mobile ? "auto" : "342px", overflow: "auto" }}>
          {state.initialized &&
            !isLoading &&
            !Boolean(state.products.length) && (
              <>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    svg: {
                      width: 300,
                      height: 300,
                    },
                  }}
                >
                  <NoDataFound className="svg" />
                </Stack>
              </>
            )}
          {!isLoading && !Boolean(state.products.length) ? (
            ""
          ) : (
            <>
              <MenuList
                sx={{
                  pt: 0,
                  mt: 1,
                  overflow: "auto",
                  px: 1,
                  li: {
                    borderRadius: "8px",
                    border: `1px solid transparent`,
                    "&:hover, &.Mui-focusVisible, &.Mui-selected ": {
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.16),
                      h6: {
                        color: "primary.main",
                      },
                    },
                    "&.active": {
                      border: (theme) =>
                        `1px solid ${theme.palette.primary.main}`,
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.16),
                      h6: {
                        color: "primary.main",
                      },
                    },
                  },
                }}
                autoFocus={!focus}
              >
                {isLoading
                  ? Array.from(new Array(mobile ? 6 : 8))
                  : state.products.map((product) => (
                      <MenuItem
                        key={product?.id}
                        className={
                          Boolean(
                            state.selected.filter((v) => v._id === product?._id)
                              ?.length
                          )
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          handleListItemClick(
                            multiSelect ? product : product?.slug
                          )
                        }
                      >
                        <ListItemIcon>
                          {isLoading ? (
                            <Skeleton
                              variant="circular"
                              width={40}
                              height={40}
                            />
                          ) : (
                            <BlurImageAvatar
                              alt={product.name}
                              src={product.image.url}
                              placeholder={"blur"}
                              blurDataURL={product.image.blurDataURL}
                              priority
                              layout="fill"
                              objectFit="cover"
                            />
                          )}
                        </ListItemIcon>
                        <ListItemText>
                          <Stack
                            direction="row"
                            gap={1}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                          >
                            <div>
                              <Typography
                                variant="subtitle1"
                                color="text.primary"
                                noWrap
                              >
                                {isLoading ? (
                                  <Skeleton variant="text" width="200px" />
                                ) : (
                                  product.name
                                )}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                noWrap
                              >
                                {isLoading ? (
                                  <Skeleton variant="text" width="200px" />
                                ) : (
                                  product.category
                                )}
                              </Typography>
                            </div>
                            <Typography
                              variant="subtitle1"
                              color="text.primary"
                              noWrap
                            >
                              {isLoading ? (
                                <Skeleton variant="text" width="100px" />
                              ) : (
                                fCurrency(cCurrency(product.priceSale))
                              )}
                            </Typography>
                          </Stack>
                        </ListItemText>
                      </MenuItem>
                    ))}
              </MenuList>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Search;
