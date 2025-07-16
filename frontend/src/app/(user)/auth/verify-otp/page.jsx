import React from "react";
// guard
import AuthGuard from "@/guards/auth";
// mui
import { Box } from "@mui/material";
//  components
import OTPMain from "@/components/_main/auth/otp";

// Meta information
export const metadata = {
  title:
    "Verify Your Email with Nextall | Confirm Your Account for Secure Shopping",
  description:
    "Complete the email verification process at Nextall to ensure a secure and personalized shopping experience. Confirm your account and gain access to exclusive features. Shop confidently with a verified email. Verify now!",
  applicationName: "Nextall",
  authors: "Nextall",
  keywords:
    "ecommerce, Nextall, Commerce, VerifyEmail Nextall, VerifyEmail Page Nextall",
};
const VerifyOTP = async () => {
  return (
    <>
      <AuthGuard>
        <Box className="auth-pages">
          <OTPMain />
        </Box>
      </AuthGuard>
    </>
  );
};

export default VerifyOTP;
