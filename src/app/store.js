import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import inscriptionReducer from "../features/inscriptions/inscriptionsSlice";
import productsReducer from "../features/products/productsSlice"
import periodsReducer from "../features/periods/periodsSlice"
import pricesReducer from "../features/prices/pricesSlice"
import omit from "lodash/omit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import createTransform from "redux-persist/es/createTransform";

const reducers = combineReducers({
  users: usersReducer,
  inscriptions: inscriptionReducer,
  products: productsReducer,
  periods:periodsReducer,
  prices:pricesReducer,
 
 
  
});

let usersBalcklist = createTransform((inboundstate, key) => {
  if (key === "users") {
    return omit(inboundstate, ["isauth", "authstatus"]);
  } else {
    return inboundstate;
  }
});

let usersauthstatus = createTransform((inboundstate, key) => {
  if (key === "users") {
    return omit(inboundstate, ["authstatus"]);
  } else {
    return inboundstate;
  }
});

let addinscriptionsstatus = createTransform((inboundstate, key) => {
  if (key === "inscriptions") {
    return omit(inboundstate, ["addinscriptionsstatus"]);
  } else {
    return inboundstate;
  }
});
let addstatus = createTransform((inboundstate, key) => {
  if (key === "products") {
    return omit(inboundstate, ["addstatus"]);
  } else {
    return inboundstate;
  }
});
let selectpricestatus = createTransform((inboundstate, key) => {
  if (key === "prices") {
    return omit(inboundstate, ["selectpricestatus"]);
  } else {
    return inboundstate;
  }
});



const persistConfig = {
  key: "root",
  storage,
  trasnforms: [usersBalcklist, usersauthstatus,addinscriptionsstatus,selectpricestatus],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
