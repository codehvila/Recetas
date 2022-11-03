import { useTheme } from "../hooks/useTheme";

import styles from "./ThemeSelector.module.css";
import modeIcon from "../assets/brightness_6_FILL0_wght400_GRAD0_opsz40.svg";

const themeColors = ["rgb(89, 4, 146)", "#098afc", "#333"];

export default function ThemeSelector() {
  const { changeBgColorTo, changeToDarkLightMode, mode } = useTheme();
  console.log("Current Mode: ", mode);

  return (
    <div className={styles.ThemeSelector}>
      <div className={styles.ThemeColors}>
        <img
          onClick={() => changeToDarkLightMode(mode)}
          style={
            mode === "dark"
              ? { filter: "invert(1)" }
              : { filter: "invert(20%)" }
          }
          src={modeIcon}
          alt="Dark/Light Mode"
        />
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeBgColorTo(color)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
