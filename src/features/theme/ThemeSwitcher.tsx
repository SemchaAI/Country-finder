import React from "react";
import { IoMoon, IoMoonOutline } from "react-icons/io5";
import { useTheme } from "../../hooks/useTheme";
import styles from "./themeSwitcher.module.css";

export const ThemeSwitcher = () => {
  const [currentTheme, handlerTheme] = useTheme();
  return (
    <div className={styles.ModeSwitcher} onClick={handlerTheme}>
      {currentTheme === "light" ? (
        <IoMoonOutline size="14px" />
      ) : (
        <IoMoon size="14px" />
      )}
      <span>{currentTheme} Theme</span>
    </div>
  );
};
