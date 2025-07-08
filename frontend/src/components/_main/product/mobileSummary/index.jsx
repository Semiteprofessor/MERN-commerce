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

export default function ProductDetailsSummaryMobile({ ...props }) {
  const { product, isLoading, totalReviews, totalRating, brand, category } = props;
  const [isClient, setIsClient] = useState(false);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const router = useRouter();

  const dispatch = useDispatch();

  const { checkout } = useSelector(({ product }) => product);

  const [isLoaded, setLoaded] = useState(false);

  const isMaxQuantity =
    !isLoading &&
    checkout.cart.filter((item) => item._id === product?._id).map((item) => item.quantity)[0] >= product?.available;

  const onAddCart = (param) => {
    toast.success('Added to cart');
    dispatch(addCart(param));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pid: product?._id,
      cover: product?.cover,

      quantity: 1
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const alreadyProduct = !isLoading && checkout.cart.filter((item) => item.pid === values.pid);
        if (!Boolean(alreadyProduct.length)) {
          const colorSelected = product?.colors.find((_, index) => index === color);
          const sizeSelected = product?.sizes.find((_, index) => index === size);
          onAddCart({
            pid: product._id,
            sku: product.sku,
            color: colorSelected,
            size: sizeSelected,
            image: product?.images[0].url,
            quantity: values.quantity,
            price: product.priceSale === 0 ? product.price : product.priceSale,
            subtotal: (product.priceSale || product?.price) * values.quantity
          });
          setFieldValue('quantity', 1);
        }

        setSubmitting(false);
        router.push('/cart');
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const { values, touched, errors, setFieldValue, handleSubmit } = formik;
  const handleAddCart = () => {
    const colorSelected = product?.colors.find((_, index) => index === color);
    const sizeSelected = product?.sizes.find((_, index) => index === size);
    onAddCart({
      pid: product._id,
      sku: product.sku,
      color: colorSelected,

      image: product?.images[0].url,
      size: sizeSelected,
      quantity: values.quantity,
      price: product.priceSale === 0 ? product.price : product.priceSale,
      subtotal: (product.priceSale || product?.price) * values.quantity
    });
    setFieldValue('quantity', 1);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);
  const isMobile = useMediaQuery('(max-width:768px)');
  return (
    <RootStyled>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography noWrap variant="h4" paragraph className="heading">
            {product?.name}
          </Typography>
          <Stack direction="row" alignItems="center" className="rating-wrapper" spacing={1}>
            <Rating value={totalRating} precision={0.1} size="small" readOnly />
            <Typography variant="body1" color="primary">
              {totalReviews} <span>{Number(totalReviews) > 1 ? 'Reviews' : 'Review'}</span>
            </Typography>

            <Typography variant="h4" className="text-price">
              {product?.price <= product?.priceSale ? null : (
                <Box component="span" className="old-price">
                  {!isLoading && isLoaded && fCurrency(product?.price)}
                </Box>
              )}
              <Box component="span">
                &nbsp;
                {!isLoading && isLoaded && fCurrency(product?.priceSale)}
              </Box>
            </Typography>
          </Stack>
          <Stack spacing={1} my={3}>
            <Stack direction="row" alignItems="center" spacing={1} mt={1.5}>
              <Typography variant="subtitle1">Brand:</Typography>
              <Typography variant="subtitle1" color="text.secondary" fontWeight={400}>
                {brand?.name || 'Commercehope'}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle1">Category:</Typography>
              <Typography variant="subtitle1" color="text.secondary" fontWeight={400}>
                {category?.name || 'Commercehope'}
              </Typography>
            </Stack>
            {product?.price > product?.priceSale && (
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle1">Discount:</Typography>
                <Typography variant="subtitle1" color="text.secondary" fontWeight={400} className="text-discount">
                  {!isLoading && isLoaded && fCurrency(product?.price - product?.priceSale)}
                  {<span>({(100 - (product?.priceSale / product?.price) * 100).toFixed(0)}% Discount)</span>}
                </Typography>
              </Stack>
            )}
export default ProductDetailsSummaryMobile;
