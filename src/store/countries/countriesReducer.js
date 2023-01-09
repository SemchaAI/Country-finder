import { SET_COUNTRIES, SET_ERROR, SET_LOADING } from "./countriesConsts";

const initialState = {
  status: "idle", //loading | received | rejected
  error: null,
  list: [],
};

export const countries = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COUNTRIES: {
      return {
        ...state,
        status: "received",
        list: payload,
        error: null,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: payload,
        status: "rejected",
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        status: "loading",
        error: null,
      };
    }
    default: {
      return initialState;
    }
  }
};
