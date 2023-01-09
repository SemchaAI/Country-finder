import {
  // ADD_FILTER,
  // CLEAR_FILTER,
  // ADD_REGIONAL_FILTER,
  SET_SEARCH,
  SET_REGION,
  SET_CLEAR,
} from "./controlsConsts";

const initState = {
  search: "",
  region: "",
};

export const controls = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_SEARCH: {
      return {
        ...state,
        search: payload,
      };
    }
    case SET_REGION: {
      return {
        ...state,
        region: payload,
      };
    }
    case SET_CLEAR: {
      return initState;
    }
    default: {
      return state;
    }
  }
};

/*
 case CLEAR_FILTER: {
      return [];
    }
    case ADD_FILTER: {
      return [action.data, state[1]];
    }
    case ADD_REGIONAL_FILTER: {
      return [state[0], action.rdata];
    }
*/
