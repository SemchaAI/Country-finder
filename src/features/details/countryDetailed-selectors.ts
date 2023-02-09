import { RootState } from "store";
//SELECTORS
export const selectCountriesInfo = (state: RootState) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});

export const selectDetails = (state: RootState) => state.country.details;
export const selectDetailsBorders = (state: RootState) => state.country.borders;
