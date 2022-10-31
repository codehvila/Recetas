import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_BG_COLOR":
      return { ...state, color: action.payload };

    default:
      return state;
  }
};

export default function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(ThemeReducer, {
    color: "rgb(89, 4, 146)",
  });

  const changeBgColorTo = (color) => {
    dispatch({ type: "CHANGE_BG_COLOR", payload: color });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeBgColorTo }}>
      {children}
    </ThemeContext.Provider>
  );
}

// { color: "#4879bd" }
