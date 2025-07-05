import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

const UserSelect = ({ isAdmin }) => {
  const { user, isAuthenticated } = useSelector(({ user }) => user);
  const router = useRouter();
  const pathname = usePathname();
  const isAuthPath = getKeyByValue(PATH_PAGE.auth, pathname);
  const isHomePath = pathname.slice(3) === "";
  const anchorRef = useRef(null);
  const [openUser, setOpenUser] = useState(false);

  const handleOpenUser = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      setOpenUser(true);
    }
  };
  return <div>UserSelect</div>;
};

export default UserSelect;
