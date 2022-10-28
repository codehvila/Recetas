import { Link } from "react-router-dom";

import NavbarSearch from "./NavbarSearch";

import { useTheme } from "../hooks/useTheme";

import styles from "./NavBar.module.css";

export default function NavBar() {
  const { color } = useTheme();

  return (
    <div className={styles.navbar} style={{ backgroundColor: color }}>
      <nav>
        <Link to="/" className={styles.brand}>
          Grandmother's Recipes
        </Link>
        <NavbarSearch />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
