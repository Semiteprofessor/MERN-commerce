import React, { useState } from "react";
import { useRouter } from "next-nprogress-bar";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";
// mui
import {
  Box,
  List,
  Stack,
  ListItem,
  Skeleton,
  Divider,
  Typography,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
// components
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import RootStyled from "./styled";

// api
import * as api from "src/services";
// redux
import { setWishlist } from "src/redux/slices/wishlist";
import { useDispatch } from "react-redux";

// Inside your functional component
Wishlist.propTypes = {
  item: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
  isUser: PropTypes.bool.isRequired,
};
