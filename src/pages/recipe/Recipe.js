import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase/firebase.config";

import { useTheme } from "../../hooks/useTheme";

import styles from "./Recipe.module.css";

export default function Recipe() {
  const { recipeId } = useParams();
  const { mode } = useTheme();

  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    setIsPending(true);

    db.collection("recipes")
      .doc(recipeId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe({ id: doc.id, ...doc.data() });
        } else {
          setIsPending(false);
          setError("No recipe found!");
        }
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [recipeId]);

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
