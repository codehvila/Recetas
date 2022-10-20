import { Link } from "react-router-dom";

import styles from "./NavBar.module.css";
import NavbarSearch from "./NavbarSearch";

export default function NavBar() {
  return (
    <div className={styles.navbar}>
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
