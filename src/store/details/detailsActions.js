import { searchByCountry } from "../../config";
import {
  SET_COUNTRY,
  SET_ERROR,
  SET_LOADING,
  SET_BORDERS,
  SET_CLEAR,
} from "./detailsConsts";

export const setCountry = (countries) => ({
  type: SET_COUNTRY,
  payload: countries,
});
export const setBorders = (countries) => ({
  type: SET_BORDERS,
  payload: countries,
});
export const setLoading = () => ({
  type: SET_LOADING,
});
export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});
export const setClear = () => ({
  type: SET_CLEAR,
});

export const loadCountryDetailed = (link) => {
  return (dispatch, _, { client, api }) => {
    dispatch(setLoading());
    console.log("loadDetails");
    client
      .get(api.searchByCountry(link))
      .then(({ data }) => dispatch(setCountry(data[0])))
      .catch((error) => dispatch(setError(error.message)));
  };
};

export const loadbordersInfo = (borders) => {
  console.log(borders);
  return (dispatch, _, { client, api }) => {
    dispatch(setLoading());
    return (
      client
        .get(api.filterByCode(borders))
        //.then(({ data }) => console.log((temp = data.map((el) => el.name))))
        .then(({ data }) => dispatch(setBorders(data.map((el) => el.name))))
        .catch((error) => dispatch(setError(error.message)))
    );
  };
};
