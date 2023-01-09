import { SWITCH_THEME } from "./themeConsts";

export const theme = (state = "light", { type, theme }) => {
  switch (type) {
    case SWITCH_THEME: {
      if (state === "light") {
        theme = "dark";
      } else theme = "light";
      return theme;
    }
    default: {
      return state;
    }
  }
};
