import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase.config";

import { useTheme } from "../../hooks/useTheme";

import deleteIcon from "../../assets/delete_FILL0_wght400_GRAD0_opsz48.svg";

import styles from "./Recipe.module.css";

export default function Recipe() {
  const { recipeId } = useParams();
  const { mode } = useTheme();

  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const navigate = useNavigate();

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

  const handleClick = (id) => {
    console.log("Trying to delete recipe: ", id);
    db.collection("recipes")
      .doc(id)
      .delete()
      .then(() => {
        console.log("\nRecipe was deleted: ", id);
        navigate("/");
      })
      .catch((err) => {
        console.log("I can't delete recipe: ", err.message);
      });
  };

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
            onClick={() => handleClick(recipe.id)}
            to={`/recipes/${recipe.id}`}
            className={`${styles.button} ${styles[mode]}`}
          >
            <img
              className={`${styles.deleteIcon} ${styles[mode]}`}
              src={deleteIcon}
              alt="Delete Recipe"
            />
            {"\u00A0"}
            Delete Recipe
          </Link>
        </div>
      )}
    </div>
  );
}
