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

const ForgetPasswordForm = ({ ...props }) => {
  const { onSent, onGetEmail } = props;
  const isMountedRef = useIsMountedRef();
  const [loading, setloading] = useState(false);
  const { mutate } = useMutation(api.forgetPassword, {
    onSuccess: () => {
      onSent();
      toast.success("Email sent check inbox");
      setloading(false);
    },
    onError: (err) => {
      const message = JSON.stringify(err.response.data.message);
      setloading(false);
      toast.error(message || "Email incorrect please try again.");
    },
  });

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      try {
        setloading(true);
        onGetEmail(values.email);
        await mutate({ email: values.email, origin: window.location.origin });
      } catch (error) {
        if (isMountedRef.current) {
          toast.error(error.message);
        }
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return <div>ForgetPasswordForm</div>;
};

export default ForgetPasswordForm;
