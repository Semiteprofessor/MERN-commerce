import PropTypes from "prop-types";
// mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  Skeleton,
  Stack,
} from "@mui/material";
import { IoClose } from "react-icons/io5";

//components
import RootStyled from "./styled";
import Incrementer from "@/components/incrementer";
// hooks
import { useCurrencyConvert } from "@/hooks/convertCurrency";
import { useCurrencyFormatter } from "@/hooks/formatCurrency";
import BlurImage from "@/components/blurImage";

const ThumbImgStyle = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  marginRight: theme.spacing(2),
  borderRadius: "8px",
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
  overflow: "hidden",
}));

// ----------------------------------------------------------------------

const CartProductList = ({ ...props }) => {
  const { onDelete, onIncreaseQuantity, onDecreaseQuantity, isLoading, cart } =
    props;
  console.log(props, "propesss");

  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();
  return (
    <RootStyled>
      <Table></Table>
    </RootStyled>
  );
};

export default CartProductList;
