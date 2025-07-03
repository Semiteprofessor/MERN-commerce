import ProductReducer from "./slices/products";
import UserReducer from "./slices/users";
import CompareReducer from "./slices/compare";
import SettingsReducer from "./slices/settings";
import CategoryReducer from "./slices/categories";
import BrandReducer from "./slices/brands";
import ShopReducer from "./slices/shops";

const persistConfig = {
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
