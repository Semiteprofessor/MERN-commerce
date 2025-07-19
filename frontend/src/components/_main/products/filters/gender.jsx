import React, { useCallback } from "react";
import PropTypes from "prop-types";
// mui
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Button,
  Stack,
  Zoom,
} from "@mui/material";
// icons
import { IoTransgender } from "react-icons/io5";
import { IoMdMale, IoMdFemale, IoMdTransgender } from "react-icons/io";
import { FaVenusMars } from "react-icons/fa";
// next
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";

GenderMain.propTypes = {
  genders: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const icons = {
  men: <IoMdMale size={20} />,
  women: <IoMdFemale size={20} />,
  kids: <FaVenusMars size={20} />,
  others: <IoMdTransgender size={20} />,
};

const GenderMain = ({ ...props }) => {
  const { genders, path } = props;
  const searchParams = useSearchParams();

  const gender = searchParams.get("gender");
  const { push } = useRouter();

  const [state, setstate] = React.useState({
    genders: [],
    isLoaded: false,
  });

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const deleteQueryString = useCallback(
    (name) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      return params.toString();
    },
    [searchParams]
  );

  return <div>GenderMain</div>;
};

export default GenderMain;
