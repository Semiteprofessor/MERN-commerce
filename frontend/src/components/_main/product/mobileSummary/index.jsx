"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next-nprogress-bar";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "next-share";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
// mui
import {
  Box,
  Stack,
  Button,
  IconButton,
  Typography,
  FormHelperText,
  Skeleton,
  Rating,
  useMediaQuery,
} from "@mui/material";
// icons
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
// formik
import { useFormik, Form, FormikProvider, useField } from "formik";
// redux
import { useDispatch, useSelector } from "src/redux/store";
import { addCart } from "src/redux/slices/product";

// components
import ColorPreview from "src/components/colorPreview";
import SizePreview from "src/components/sizePicker";
import { fCurrency } from "src/utils/formatNumber";
import RootStyled from "./styled";

const ProductDetailsSummaryMobile = () => {
  return <div>ProductDetailsSummaryMobile</div>;
};

ProductDetailsSummaryMobile.propTypes = {
  product: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  totalReviews: PropTypes.number.isRequired,
  totalRating: PropTypes.number.isRequired,
  brand: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};
  
const Incrementer = ({ ...props }) => {
  const { available } = props;
  const [field, , helpers] = useField(props);
  // eslint-disable-next-line react/prop-types

  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box className="incrementer">
      <IconButton
        size="small"
        color="inherit"
        disabled={value <= 1}
        onClick={decrementQuantity}
      >
        <IoIosRemove />
      </IconButton>
      <Typography variant="body2" component="span" className="text">
        {value}
      </Typography>
      <IconButton
        size="small"
        color="inherit"
        disabled={value >= available}
        onClick={incrementQuantity}
      >
        <IoIosAdd />
      </IconButton>
    </Box>
  );
};

Incrementer.propTypes = {
  available: PropTypes.number.isRequired,
};
export default ProductDetailsSummaryMobile;
