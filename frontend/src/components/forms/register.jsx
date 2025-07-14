"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import RouterLink from "next/link";
import { toast } from "react-hot-toast";
// yup
import * as Yup from "yup";
// formik
import { useFormik, Form, FormikProvider } from "formik";
// redux
import { useDispatch } from "react-redux";
import { setLogin } from "src/redux/slices/user";
// api
import { useMutation } from "react-query";
import * as api from "src/services";
// mui
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
  Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// icons
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { IoMdMale } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { MdLock } from "react-icons/md";
import { IoMdFemale } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { FaTransgender } from "react-icons/fa6";
// hooks
import { createCookies } from "src/hooks/cookies";

const RegisterForm = () => {
  return <div>RegisterForm</div>;
};

export default RegisterForm;
