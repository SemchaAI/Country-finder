import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadDetails = createAsyncThunk(
  "@@details/loadDetails",
  (link, { extra: { client, api } }) => {
    return client.get(api.searchByCountry(link));
  }
);
export const loadBordersDetails = createAsyncThunk(
  "@@details/loadBorders",
  async (borders, { extra: { client, api } }) => {
    return client.get(api.filterByCode(borders));
  }
);

const initialState = {
  status: "idle", //loading | received | rejected
  error: null,
  details: null,
  borders: [],
};

const detailsSlice = createSlice({
  name: "@@details",
  initialState: initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(loadDetails.fulfilled, (state, action) => {
        state.status = "received";
        state.details = action.payload.data[0];
        state.error = null;
      })
      .addCase(loadBordersDetails.fulfilled, (state, action) => {
        state.status = "received";
        state.borders = action.payload.data.map((el) => el.name);
        state.error = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/loading"),
        (state, action) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "rejected";
          state.error = action.payload || action.meta.error;
        }
      );
  },
});

export const { setDetails, clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

//SELECTORS
export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
});

export const selectDetails = (state) => state.country.details;
export const selectDetailsBorders = (state) => state.country.borders;

//   .addCase(loadDetails.pending, (state, action) => {
//     state.status = "loading";
//     state.error = null;
//   })
//   .addCase(loadDetails.rejected, (state, action) => {
//     state.status = "rejected";
//     state.error = action.payload || action.meta.error;
//   })
