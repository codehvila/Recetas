import { Link } from "react-router-dom";
import { db } from "../firebase/firebase.config";

import { useTheme } from "../hooks/useTheme";

import deleteIcon from "../assets/delete_FILL0_wght400_GRAD0_opsz48.svg";

import styles from "./RecipeList.module.css";

export default function RecipeList({ data: recipes }) {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div className="error">Sorry! There are no recipe!</div>;
  }

  const handleClick = (id) => {
    db.collection("recipes")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Recipe succesfully deleted!");
      })
      .catch((err) => {
        console.log("Error deleting recipe: ", err.message);
      });
  };

  return (
    <div className={styles.RecipeList}>
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe.id} className={styles.card}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <h3>{recipe.title}</h3>
              <img
                className={`${styles.deleteIcon} ${styles[mode]}`}
                onClick={() => handleClick(recipe.id)}
                src={deleteIcon}
                alt="Delete Recipe"
              />
            </div>
            <p className={styles.cookingTime}>{recipe.cookingTime} to make</p>
            <div className={styles.ingredientsLine}>
              {recipe.ingredients.map((ingredient) => (
                <span key={ingredient} className={styles.ingredients}>
                  {ingredient}
                </span>
              ))}
            </div>
            <p>{recipe.method.substring(0, 54)}...</p>
            <div
              style={{
                alignSelf: "flex-end",
                flexGrow: 2,
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Link
                to={`/recipes/${recipe.id}`}
                className={`${styles.button} ${styles[mode]}`}
              >
                Read Recipe
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}
