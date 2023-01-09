import {
  SET_COUNTRY,
  SET_ERROR,
  SET_LOADING,
  SET_BORDERS,
  SET_CLEAR,
} from "./detailsConsts";

const initialState = {
  status: "idle", //loading | received | rejected
  error: null,
  details: null,
  borders: [],
};

export const country = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COUNTRY: {
      return {
        ...state,
        status: "received",
        details: payload,
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
    case SET_BORDERS: {
      return {
        ...state,
        status: "received",
        error: null,
        borders: [...payload],
      };
    }
    case SET_CLEAR: {
      return initialState;
    }
    default: {
      return { ...state };
    }
  }
};
