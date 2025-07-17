"use client";
import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
// mui
import {
  Card,
  Button,
  CardHeader,
  Typography,
  Box,
  Skeleton,
  Stack,
  Divider,
} from "@mui/material";
import { sum } from "lodash";
// formik
import { useFormik, Form, FormikProvider } from "formik";
// icons
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  increaseQuantity,
  decreaseQuantity,
  getCart,
  resetCart,
} from "@/redux/slices/product";
// component
import CheckoutCard from "@/components/cards/checkout";
import CheckoutProductList from "@/components/lists/checkoutProduct";
// Styled
import RootStyled from "./styled";

ShoppingCart.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const EmptyCart = dynamic(() => import("@/illustrations/emptyCart"), {
  loading: () => (
    <Stack>
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  ),
});
// ----------------------------------------------------------------------

const ShoppingCart = ({ loading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { checkout } = useSelector(({ product }) => product);
  const { cart } = checkout;

  const [count, setCount] = React.useState(0);

  const isEmptyCart = cart.length === 0;
  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
    setCount((prev) => prev + 1);
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
    setCount((prev) => prev + 1);
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
    setCount((prev) => prev + 1);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: [] },
    onSubmit: () => {},
  });
  const { handleSubmit } = formik;
  const totalItems = sum(cart?.map((item) => item.quantity));

  React.useEffect(() => {
    dispatch(getCart(cart));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return <div>ShoppingCart</div>;
};

export default ShoppingCart;
