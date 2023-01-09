import { combineReducers } from "redux";

import { countries } from "./countries/countriesReducer";
import { theme } from "./theme/themeReducer";
import { controls } from "./controls/controlsReducer";
import { country } from "./details/detailsReducer";

export const rootReducer = combineReducers({
  countries,
  country,
  theme,
  controls,
});
