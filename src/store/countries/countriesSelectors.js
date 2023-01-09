export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});

export const selectAllCountries = (state) => {
  console.log("selectAllCountries");
  return state.countries.list;
};

export const selectSearchCountries = (state, { search = "", region = "" }) => {
  return state.countries.list.filter((pos) => {
    console.log(search.toLowerCase());
    return (
      pos.name.toLowerCase().includes(search.toLowerCase()) &&
      pos.region.toLowerCase().includes(region.toLowerCase())
    );
  });
};

// export const selectFiltredCountries = (state, filters = []) => {
//   console.log("selectFiltredCountries");
//   if (filters.length === 1) {
//     console.log("111");
//     return state.countries.list;
//   }

//   let regFilter = state.countries.list;

//   if (filters[1]) {
//     regFilter = regFilter.filter((pos) => {
//       return pos.region === filters[1];
//     });
//   }

//   return regFilter.filter((pos) => {
//     const posFilters = "".concat(
//       pos.name && pos.name.toLowerCase(),
//       pos.capital && pos.capital.toLowerCase(),
//       pos.region && pos.region.toLowerCase()
//     );

//     return posFilters.search(filters[0]) !== -1;
//   });
// };
