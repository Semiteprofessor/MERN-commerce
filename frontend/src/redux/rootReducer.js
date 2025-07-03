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

