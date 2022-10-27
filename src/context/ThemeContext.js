import { createContext } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={{ color: "#333" }}>
      {children}
    </ThemeContext.Provider>
  );
}

// { color: "#4879bd" }
