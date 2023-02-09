import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import { Country, Extra, status } from "types";

export const loadDetails = createAsyncThunk<
  { data: Country[] },
  string,
  { extra: Extra }
>("@@details/loadDetails", (link, { extra: { client, api } }) => {
  return client.get(api.searchByCountry(link));
});
export const loadBordersDetails = createAsyncThunk<
  { data: Country[] },
  string[],
  { extra: Extra }
>("@@details/loadBorders", async (borders, { extra: { client, api } }) => {
  return client.get(api.filterByCode(borders));
});

interface initState {
  status: status;
  error: string | null;
  details: null | Country;
  borders: string[];
}

const initialState: initState = {
  status: "idle", //loading | received | rejected
  error: null,
  details: null,
  borders: [],
};

const detailsSlice = createSlice({
  name: "@@details",
  initialState,
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
          state.error = action.payload;
        }
      );
  },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

//   .addCase(loadDetails.pending, (state, action) => {
//     state.status = "loading";
//     state.error = null;
//   })
//   .addCase(loadDetails.rejected, (state, action) => {
//     state.status = "rejected";
//     state.error = action.payload || action.meta.error;
//   })
