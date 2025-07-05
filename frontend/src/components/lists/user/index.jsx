import React from "react";
import { useRouter } from "next-nprogress-bar";
import PropTypes from "prop-types";
// redux
import { useDispatch } from "react-redux";
import { setLogout } from "src/redux/slices/user";
import { resetWishlist } from "src/redux/slices/wishlist";
// mui
import {
  Typography,
  Divider,
  ListItemIcon,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
// icons
import { LuLogOut } from "react-icons/lu";
import { MdKey } from "react-icons/md";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { IoIosHeartEmpty } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { SlHome } from "react-icons/sl";
import { TbUserSquareRounded } from "react-icons/tb";
import { CiShop } from "react-icons/ci";

// styles
import RootStyled from "./styled";
// hooks
import { deleteCookies } from "src/hooks/cookies";

UserList.propTypes = {
  openUser: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default function UserList({ ...props }) {
    const { openUser, user, setOpen } = props;
    const router = useRouter();
    const dispatch = useDispatch();
  
    const onLogout = () => {
      deleteCookies('token');
      dispatch(setLogout());
      dispatch(resetWishlist());
      setOpen(false);
      setTimeout(() => {
        location.href = '/auth/login';
      }, 1000);
    };
  
    return (
      <RootStyled autoFocusItem={openUser} id="composition-menu">
        <Box px={2}>
          <Typography variant="body1" color="text.primary" fontWeight={600} noWrap>
            {user?.firstName + ' ' + user?.lastName} {user?.role === 'admin' ? '( Admin )' : ''}
          </Typography>
          <Typography variant="body2" color="text.secondary" pb={1} noWrap>
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          className="menu-item"
          onClick={() => {
            router.push('/');
            setOpen(false);
          }}
        >
          <ListItemIcon className="menu-icon">
            <SlHome />
          </ListItemIcon>
          Home
        </MenuItem>