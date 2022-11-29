import { app } from "./reducer";
import thunk from "redux-thunk";

const { createStore, applyMiddleware, compose } = require("redux");
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configStore = () => {
  return createStore(app, composeEnhancers(applyMiddleware(thunk)));
};

export default configStore;
