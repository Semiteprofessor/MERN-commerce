import React from "react";

// mui
import { Container } from "@mui/material";

// component
import CartMain from "@/components/_main/cart";
import HeaderBreadcrumbs from "@/components/headerBreadcrumbs";

// Meta information
export const metadata = {
  title:
    "Nextall Shopping Cart | Nextall - Convenient Shopping Cart for Easy Checkout",
  description:
    "View your shopping cart on Nextall for easy checkout. Add, remove, and manage items effortlessly. Enjoy a seamless shopping experience with secure transactions and personalized recommendations. Explore your cart now!",
  applicationName: "Nextall",
  authors: "Nextall",
  keywords:
    "shopping cart, Nextall, view cart, cart items, add to cart, remove from cart, manage cart, checkout, online shopping, secure transactions, personalized recommendations, seamless shopping, convenient shopping",
};

const Cart = async () => {
  return (
    <Container maxWidth="xl">
      <HeaderBreadcrumbs
        heading="Cart"
        links={[
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Products",
            href: "/products",
          },
          {
            name: "Cart",
          },
        ]}
      />
      <CartMain />
    </Container>
  );
};

export default Cart;
