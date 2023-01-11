import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountries = createAsyncThunk(
  "@@countries/loadCountries",
  async (_, { extra: { client, api } }) => {
    return client.get(api.ALL_COUNTRIES);
  }
);

const initialState = {
  status: "idle", //loading | received | rejected
  error: null,
  list: [],
};

const countriesSlice = createSlice({
  name: "@@countries",
  initialState: initialState,
  reducers: {
    setCountries: (_, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = "received";
        state.list = action.payload.data;
        state.error = null;
      });
  },
});

export const { setCountries } = countriesSlice.actions;
export const countriesReducer = countriesSlice.reducer;
export const selectCountries = (state) => state.countries;

//SELECTORS
export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});

export const selectAllCountries = (state) => {
  //console.log("selectAllCountries");
  return state.countries.list;
};

export const selectSearchCountries = (state, { search = "", region = "" }) => {
  return state.countries.list.filter((pos) => {
    // console.log(search.toLowerCase());
    return (
      pos.name.toLowerCase().includes(search.toLowerCase()) &&
      pos.region.toLowerCase().includes(region.toLowerCase())
    );
  });
};
