import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase.config";

import { useTheme } from "../../hooks/useTheme";

import Update from "../update/Update";

import deleteIcon from "../../assets/delete_FILL0_wght400_GRAD0_opsz48.svg";
import editIcon from "../../assets/edit_FILL0_wght400_GRAD0_opsz48.svg";

import styles from "./Recipe.module.css";

export default function Recipe() {
  const { recipeId } = useParams();
  const { mode } = useTheme();

  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [recipe, setRecipe] = useState(null);

  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsPending(true);

    const unsubscribe = db
      .collection("recipes")
      .doc(recipeId)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            setIsPending(false);
            setRecipe({ id: doc.id, ...doc.data() });
          } else {
            setIsPending(false);
            setError("No recipe found!");
          }
        },
        (err) => {
          setIsPending(false);
          setError(err.message);
        }
      );

    return () => unsubscribe();
  }, [recipeId]);

  const handleDeleteClick = (id) => {
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

  const handleToggleEditClick = () => {
    setIsUpdating(!isUpdating);
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
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link
              onClick={() => handleDeleteClick(recipe.id)}
              to={`/recipes/${recipe.id}`}
              className={`${styles.button} ${styles[mode]}`}
            >
              <img
                className={`${styles.deleteIcon} ${styles[mode]}`}
                src={deleteIcon}
                alt="Delete Recipe"
              />
              {"\u00A0"}
              Delete{"\u00A0"}Recipe
            </Link>
            <button
              onClick={handleToggleEditClick}
              className={`${styles.button} ${styles[mode]}`}
              style={{ maxWidth: "11rem" }}
            >
              <img
                className={`${styles.editIcon} ${styles[mode]}`}
                src={editIcon}
                alt="Update Recipe"
              />
              {"\u00A0"}Update Recipe
            </button>
          </div>
        </div>
      )}

      {isUpdating && recipe && <Update recipeData={recipe} />}
    </div>
  );
}
