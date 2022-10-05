import { AppDispatch, RootState } from "../Interfaces";
import { PAY_WITH_CARD, RESET_STATE, SAVE_TO_DB, SELECT_LANGUAGE, SEND_EMAIL, WRITE_GREETINGS } from "./actionTypes";

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

export const writeGreetingsAction = (greetings: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: WRITE_GREETINGS, payload: greetings });
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

export const selectLanguageAction = (language: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: SELECT_LANGUAGE, payload: language });
  } catch (error) {
    console.log({ error });
  }
};
