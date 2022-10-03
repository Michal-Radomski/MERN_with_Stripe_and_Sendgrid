import { combineReducers } from "redux";

import { Action, RootState } from "../Interfaces";
import { PAY_WITH_CARD, RESET_STATE, SAVE_TO_DB, SEND_EMAIL } from "./actionTypes";

const initialState: RootState = {
  idempotencyKey: "",
  id: "",
  amount_paid: "",
  currency: "",
  created: 0,
  paid: false,
  receipt_email: "",
  receipt_url: "",
  name: "",
  mailWasSent: false,
  savedToMongoDB: false,
};

const appReducer = function (state = initialState, action: Action): RootState {
  switch (action.type) {
    case PAY_WITH_CARD:
      return { ...state, ...action.payload };
    case SEND_EMAIL:
      return { ...state, mailWasSent: true };
    case SAVE_TO_DB:
      return { ...state, savedToMongoDB: true };
    case RESET_STATE:
      return { ...initialState };

    default:
      return state;
  }
};

// CombineReducer
const rootReducer = combineReducers({
  appState: appReducer,
});

export default rootReducer;
