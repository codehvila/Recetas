import { useParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import { useTheme } from "../../hooks/useTheme";

import styles from "./Recipe.module.css";

export default function Recipe() {
  const { recipeId } = useParams();
  const endPoint = "http://localhost:3005/recipes/" + recipeId;
  const { data: recipe, isPending, error } = useFetch(endPoint);
  const { mode } = useTheme();

  return (
    <div className={styles.Recipe}>
      <h2>Recipe Details</h2>
      {error && <div className="error">{error}</div>}
      {isPending && (
        <div className="loading">Loading Recipe {recipeId} ...</div>
      )}
      {recipe && (
        <div className={styles.card}>
          <h3>{recipe.title}</h3>
          <p className={styles.cookingTime}>{recipe.cookingTime} to make</p>
          <div className={styles.ingredientsLine}>
            {recipe.ingredients.map((ingredient) => (
              <span key={ingredient} className={styles.ingredients}>
                {ingredient}
              </span>
            ))}
          </div>
          <p>{recipe.method}</p>
          <Link
            to={`/recipes/${recipe.id}`}
            className={`${styles.button} ${styles[mode]}`}
          >
            Read Recipe
          </Link>
        </div>
      )}
    </div>
  );
}
