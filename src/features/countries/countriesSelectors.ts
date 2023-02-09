import { RootState } from "store";

export const selectCountries = (state: RootState) => state.countries;

//SELECTORS
export const selectCountriesInfo = (state: RootState) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});

export const selectAllCountries = (state: RootState) => {
  //console.log("selectAllCountries");
  return state.countries.list;
};

export const selectSearchCountries = (
  state: RootState,
  { search = "", region = "" }
) => {
  return state.countries.list.filter((pos) => {
    // console.log(search.toLowerCase());
    return (
      pos.name.toLowerCase().includes(search.toLowerCase()) &&
      pos.region.toLowerCase().includes(region.toLowerCase())
    );
  });
};
