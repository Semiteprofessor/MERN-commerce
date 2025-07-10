"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// mui
import {
  Typography,
  Card,
  Box,
  Skeleton,
  Stack,
  Button,
  CardContent,
  Divider,
} from "@mui/material";
// components
import Image from "@/components/blurImage";
import { updateFollowShop } from "src/redux/slices/user";
// icons
import { AiOutlineShop } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
// api
import * as api from "@/services";

const ShopCard = ({ ...props }) => {
  return <div>ShopCard</div>;
};

export default ShopCard;
