import { SWITCH_THEME } from "./themeConsts";

export const switchTheme = (theme) => ({
  type: SWITCH_THEME,
  theme,
});
