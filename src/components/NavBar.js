import { Link } from "react-router-dom";

import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <nav>
        <Link to="/" className={styles.brand}>
          Grandmother's Recipes
        </Link>
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}
