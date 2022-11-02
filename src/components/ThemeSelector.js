import { useTheme } from "../hooks/useTheme";

import styles from "./ThemeSelector.module.css";

const themeColors = ["rgb(89, 4, 146)", "#098afc", "#333"];

export default function ThemeSelector() {
  const { changeBgColorTo } = useTheme();

  return (
    <div className={styles.ThemeSelector}>
      <div className={styles.ThemeColors}>
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
