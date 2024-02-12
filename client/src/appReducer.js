import { combineReducers } from "redux";
import { colDetailsReducer, userSigninReducer,BonLivrReducer } from "./actions/reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "production-bagage",
  storage,
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  Load: colDetailsReducer,
  Bon: BonLivrReducer
});

export default persistReducer(persistConfig, reducer);