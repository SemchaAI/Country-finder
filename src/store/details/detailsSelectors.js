export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});

export const selectDetails = (state) => {
  console.log("selectDetails");
  return state.country.details;
};
export const selectDetailsBorders = (state) => {
  console.log("selectDetails");
  return state.country.borders;
};
