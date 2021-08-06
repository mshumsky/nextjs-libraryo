import {createStore} from "redux";
import reducer from "./reducer";

const enhancer =
  process.env.NODE_ENV === "development" &&
  require("redux-devtools-extension").composeWithDevTools();

const store = createStore(reducer, enhancer);
export default store;
