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

export default ProductDetailsSummaryMobile;
