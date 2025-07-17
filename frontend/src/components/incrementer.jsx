// mui
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

// mui
import { Typography, Fab, Stack } from "@mui/material";

// icons
import { IoIosRemove } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";

const IncrementerStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0.5, 0.75),
}));

const Incrementer = ({ ...props }) => {
  return <div>Incrementer</div>;
};

export default Incrementer;
