"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";

// yup
import * as Yup from "yup";
// formik
import { Form, FormikProvider, useFormik } from "formik";
// mui
import { TextField, Stack, InputAdornment, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// icons
import { IoMdMail } from "react-icons/io";
// components
import useIsMountedRef from "src/hooks/useIsMountedRef";
// api
import * as api from "src/services";
import { useMutation } from "react-query";

const ForgetPasswordForm = () => {
  return <div>ForgetPasswordForm</div>;
};

export default ForgetPasswordForm;
