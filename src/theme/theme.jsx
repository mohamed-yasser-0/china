import { createContext, useState } from "react";

export const ThemeContext = createContext();
const themes = {
  light: {
    background: "#fff",
    text: "#000",
  },
  dark: {
    background: "#252222",
    text: "#fff",
  },
};
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  const value = {
    theme,
    toggleTheme,
    colors: themes[theme],
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
