import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Region } from "types";

interface initState {
  search: string;
  region: Region | "";
}

const initialState: initState = {
  search: "",
  region: "",
};
const controlsSlice = createSlice({
  name: "@@controls",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setRegion: (state, action: PayloadAction<Region | "">) => {
      state.region = action.payload;
    },
    setClear: () => initialState,
  },
});

export const { setSearch, setRegion, setClear } = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;
