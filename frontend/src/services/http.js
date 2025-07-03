import axios from "axios";

const getToken = () => {
  const cname = "token";
  if (typeof window !== "undefined") {
    let name = cname + "=";
    let decodeCookie = decodeURIComponent(document.cookie);
    let ca = decodeCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let ca = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  return "";
};
