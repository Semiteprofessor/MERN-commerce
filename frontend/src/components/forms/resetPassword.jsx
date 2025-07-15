"use client";
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-hot-toast";

// yup
import * as Yup from "yup";
// formik
import { Form, FormikProvider, useFormik } from "formik";
// mui
import {
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// icons
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { MdLock } from "react-icons/md";
// api
import * as api from "src/services";
import { useMutation } from "react-query";

// ----------------------------------------------------------------------

const ResetPasswordForm = ({ ...props }) => {
  const { token } = props;
  const { push } = useRouter();
  const [loading, setloading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { mutate } = useMutation(api.resetPassword, {
    onSuccess: () => {
      setloading(false);
      push("/auth/login");
      toast.success("Password successfully updated.");
    },
    onError: (err) => {
      const message = JSON.stringify(err.response.data.message);
      setloading(false);
      toast.error(message || "Reset failed. try again");
    },
  });

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Short password")
      .required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Password is not matched"
    ),
  });

  return <div>ResetPasswordForm</div>;
};

export default ResetPasswordForm;
