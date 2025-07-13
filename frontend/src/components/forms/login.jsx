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

const LoginForm = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const searchParam = useSearchParams();
  const redirect = searchParam.get("redirect");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate } = useMutation(api.login, {
    onSuccess: async (data) => {
      dispatch(setLogin(data.user));
      dispatch(setWishlist(data.user.wishlist));
      await createCookies("token", data.token);
      setLoading(false);
      toast.success("Logged in successfully!");
      const isAdmin = data.user.role.includes("admin");
      const isVendor = data.user.role.includes("vendor");
      push(
        redirect || isAdmin
          ? "/admin/dashboard"
          : isVendor
            ? "/vendor/dashboard"
            : "/"
      );
    },
    onError: (err) => {
      setLoading(false);
      toast.error(err.response.data.message);
    },
  });
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password should be 8 characters or longer."),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      const { email, password } = values;
      setLoading(true);
      mutate({ email, password });
    },
  });

  const {
    errors,
    touched,
    setFieldValue,
    values,
    handleSubmit,
    getFieldProps,
  } = formik;
  return (
    <>
      <Stack
        mb={3}
        gap={2}
        sx={{
          "& .MuiAlert-action": {
            alignItems: "center",
          },
        }}
      >
        {" "}
        <Alert
          severity="primary"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setFieldValue("email", "admin@nextall.com");
                setFieldValue("password", "test1234");
              }}
            >
              Copy
            </Button>
          }
        >
          <AlertTitle>Admin</AlertTitle>
          <b>Email:</b> admin@test.com | <b>password:</b> test1234
        </Alert>{" "}
        <Alert
          severity="secondary"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setFieldValue("email", "vendor@nextall.com");
                setFieldValue("password", "test1234");
              }}
            >
              Copy
            </Button>
          }
        >
          <AlertTitle>Vendor</AlertTitle>
          <b>Email:</b> vendor@test.com | <b>password:</b> test1234
        </Alert>
      </Stack>
    </>
  );
};

export default LoginForm;
