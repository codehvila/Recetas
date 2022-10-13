import RecipeList from "../../components/RecipeList";
import useFetch from "../../hooks/useFetch";

import styles from "./Home.module.css";

export default function Home() {
  const {
    data: recipes,
    isPending,
    error,
  } = useFetch("http://localhost:3005/recipes");

  return (
    <div className={styles.Home}>
      <h2>Home Recipes</h2>
      <div>
        {error && <p className={styles.error}>{error}</p>}
        {isPending && <p className={styles.spinner}>Loadding Recipes...</p>}
        {recipes && <RecipeList data={recipes} />}
      </div>
    </div>
  );
}
