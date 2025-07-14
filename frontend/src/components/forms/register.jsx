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
  const router = useRouter();
  const searchParam = useSearchParams();
  const redirect = searchParam.get("redirect");
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(50, "Too long!")
      .required("First name is required"),
    lastName: Yup.string()
      .max(50, "Too long!")
      .required("Last name is required"),
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password should be 8 characters or longer."),
  });
  return <div>RegisterForm</div>;
};

export default RegisterForm;
