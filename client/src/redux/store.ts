import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import rootReducer from "./reducer";

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(reduxThunk)));

export default store;
