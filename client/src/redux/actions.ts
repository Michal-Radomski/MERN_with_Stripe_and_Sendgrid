import { AppDispatch, RootState } from "../Interfaces";
import { PAY_WITH_CARD } from "./actionTypes";

export const payWithCard = (data: RootState) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: PAY_WITH_CARD, payload: data });
  } catch (error) {
    console.log({ error });
  }
};
