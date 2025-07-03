import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can use other storage options if needed

import ProductReducer from "./slices/products";
import UserReducer from "./slices/users";
import WishlistReducer from "./slices/wishlist";
import CompareReducer from "./slices/compare";
import SettingsReducer from "./slices/settings";
import CategoryReducer from "./slices/categories";
import BrandReducer from "./slices/brands";
import ShopReducer from "./slices/shops";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
  keyPrefix: "redux-",
  whitelist: ["wishlist"],
};

const comparePersistConfig = {
  key: "compare",
  storage,
  keyPrefix: "redux-",
  whitelist: ["product"],
};

const settingsPersistConfig = {
  key: "user",
  storage,
  keyPrefix: "redux-",
  whitelist: ["user", "isAuthenticated"],
};

const userPersistConfig = {
  key: "user",
  storage,
  keyPrefix: "redux-",
  whitelist: ["user", "isAuthenticated"],
};

const reducer = combineReducers({
  product: persistReducer(productPersistConfig, ProductReducer),
  user: persistReducer(userPersistConfig, UserReducer),
  settings: persistReducer(settingsPersistConfig, SettingsReducer),
  wishlist: persistReducer(wishlistPersistConfig, WishlistReducer),
  compare: persistReducer(comparePersistConfig, CompareReducer),
  categories: CategoryReducer,
  brands: BrandReducer,
  shops: ShopReducer,
});

export { rootPersistConfig, reducer };
