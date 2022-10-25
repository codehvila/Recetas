import { useSearchParams } from "react-router-dom";

import styles from "./Search.module.css";

import useFetch from "../../hooks/useFetch";

import RecipeList from "../../components/RecipeList";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const url = "http://localhost:3005/recipes?q=" + query;

  const { data: recipes, isPending, error } = useFetch(url);

  return (
    <div className={styles.Search}>
      <h2>Search</h2>
      <p>Recipes including '{searchParams.get("q")}'</p>
      {error && <p className={styles.error}>{error}</p>}
      {isPending && <p className={styles.spinner}>Loadding Recipes...</p>}
      {recipes && <RecipeList data={recipes} />}
    </div>
  );
}
