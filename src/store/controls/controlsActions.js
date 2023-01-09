import {
  // ADD_FILTER,
  // CLEAR_FILTER,
  // ADD_REGIONAL_FILTER,
  SET_SEARCH,
  SET_REGION,
  SET_CLEAR,
} from "./controlsConsts";

// export const addFilters = (data) => ({
//   type: ADD_FILTER,
//   data,
// });

// export const addRegionalFilters = (rdata) => ({
//   type: ADD_REGIONAL_FILTER,
//   rdata,
// });

export const setSearch = (search) => ({
  type: SET_SEARCH,
  payload: search,
});
export const setRegion = (region) => ({
  type: SET_REGION,
  payload: region,
});
export const setClear = () => ({
  type: SET_CLEAR,
});

// export const clearFilters = {
//   type: CLEAR_FILTER,
// };
