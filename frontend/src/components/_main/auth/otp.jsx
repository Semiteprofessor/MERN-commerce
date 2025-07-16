import React from "react";
// component
import VerifyOTPForm from "src/components/forms/otp";
import PropTypes from "prop-types";

const OTPMain = ({ user }) => {
  return (
    <>
      <VerifyOTPForm user={user} />
    </>
  );
};

OTPMain.propTypes = {
  user: PropTypes.object.isRequired,
};

export default OTPMain;
