import { AppDispatch, RootState } from "../Interfaces";
import { PAY_WITH_CARD, SEND_EMAIL } from "./actionTypes";

export const payWithCard = (data: RootState) => async (dispatch: AppDispatch) => {
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
