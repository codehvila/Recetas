import { Link } from "react-router-dom";

import styles from "./RecipeList.module.css";

export default function RecipeList({ data: recipes }) {
  return (
    <div className={styles.RecipeList}>
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe.id} className={styles.card}>
            <h3>{recipe.title}</h3>
            <p className={styles.cookingTime}>{recipe.cookingTime} to make</p>
            <div className={styles.ingredientsLine}>
              {recipe.ingredients.map((ingredient) => (
                <span key={ingredient} className={styles.ingredients}>
                  {ingredient}
                </span>
              ))}
            </div>
            <p>{recipe.method.substring(0, 54)}...</p>
            <Link to={`/recipes/${recipe.id}`} className={styles.button}>
              Read Recipe
            </Link>
          </div>
        ))}
    </div>
  );
}