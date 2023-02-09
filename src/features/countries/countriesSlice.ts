import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Country, Extra, status } from "types";

export const loadCountries = createAsyncThunk<
  { data: Country[] },
  undefined,
  {
    state: { countries: CountrySlice };
    extra: Extra;
    rejectValue: string;
  }
>(
  "@@countries/loadCountries",
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      return client.get(api.ALL_COUNTRIES);
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("Unknown err");
    }
  },
  {
    condition: (_, { getState }) => {
      const {
        countries: { status },
      } = getState();
      if (status === "loading") {
        return false;
      }
    },
  }
);

export type CountrySlice = {
  status: status;
  error: null | string;
  list: Country[];
};

const initialState: CountrySlice = {
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
        state.error = action.payload || "Cannot load data"; //|| action.meta.error;
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
