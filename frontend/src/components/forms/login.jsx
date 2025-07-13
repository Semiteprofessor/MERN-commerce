"use client";
import * as Yup from "yup";
import { useState } from "react";
import { useMutation } from "react-query";
import RouterLink from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import toast from "react-hot-toast";

// formik
import { useFormik, Form, FormikProvider } from "formik";
// cookies
import { createCookies } from "@/hooks/cookies";
// redux
import { useDispatch } from "react-redux";
import { setWishlist } from "@/redux/slices/wishlist";
import { setLogin } from "@/redux/slices/user";
// api
import * as api from "@/services";
// mui
import {
  Link,
  Typography,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// icons
import {
  MdOutlineVisibility,
  MdLock,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import { IoMdMail } from "react-icons/io";

const login = () => {
  return <div>login</div>;
};

export default login;
