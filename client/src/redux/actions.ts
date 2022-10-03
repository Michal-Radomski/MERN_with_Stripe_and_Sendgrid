import { AppDispatch, RootState } from "../Interfaces";
import { PAY_WITH_CARD, RESET_STATE, SAVE_TO_DB, SEND_EMAIL } from "./actionTypes";

export const payWithCardAction = (data: RootState) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: PAY_WITH_CARD, payload: data });
  } catch (error) {
    console.log({ error });
  }
};

export const sendEmailAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SEND_EMAIL });
  } catch (error) {
    console.log({ error });
  }
};

export const saveToDBAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SAVE_TO_DB });
  } catch (error) {
    console.log({ error });
  }
};

export const resetStateAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: RESET_STATE });
  } catch (error) {
    console.log({ error });
  }
};
