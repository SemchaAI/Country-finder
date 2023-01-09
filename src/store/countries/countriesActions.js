import { SET_COUNTRIES, SET_ERROR, SET_LOADING } from "./countriesConsts";

// export const loadCountries = (list) => ({
//   type: LOAD_COUNTRIES,
//   list,
// });

export const setCountries = (countries) => ({
  type: SET_COUNTRIES,
  payload: countries,
});
export const setLoading = () => ({
  type: SET_LOADING,
});
export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const loadCountries =
  () =>
  (dispatch, _, { client, api }) => {
    dispatch(setLoading());
    console.log("loadCountries");
    client
      .get(api.ALL_COUNTRIES)
      .then(({ data }) => dispatch(setCountries(data)))
      .catch((error) => dispatch(setError(error.message)));
  };
