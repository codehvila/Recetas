import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_BG_COLOR": {
      return { ...state, color: action.payload };
    }
    case "CHANGE_MODE": {
      return { ...state, mode: action.payload === "dark" ? "light" : "dark" };
    }
    default:
      return state;
  }
};

export default function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(ThemeReducer, {
    color: "rgb(89, 4, 146)",
    mode: "light",
  });

  const changeBgColorTo = (color) => {
    dispatch({ type: "CHANGE_BG_COLOR", payload: color });
  };

  const changeToDarkLightMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  return (
    <ThemeContext.Provider
      value={{ ...state, changeBgColorTo, changeToDarkLightMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// { color: "#4879bd" }
