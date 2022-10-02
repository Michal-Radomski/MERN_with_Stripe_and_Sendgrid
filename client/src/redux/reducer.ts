import { combineReducers } from "redux";

import { Action, RootState } from "../Interfaces";
import { PAY_WITH_CARD } from "./actionTypes";

const initialState: RootState = {
  testValue: "testValue",
  idempotencyKey: "",
  id: "",
  amount_paid: "",
  currency: "",
  created: 0,
  paid: false,
  receipt_email: "",
  receipt_url: "",
  name: "",
};

const reducer = function (state = initialState, action: Action): RootState {
  switch (action.type) {
    case PAY_WITH_CARD:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

// CombineReducer
const rootReducer = combineReducers({
  reducer: reducer,
});

export default rootReducer;
