import { useRef, useState } from "react";
import { db } from "../../firebase/firebase.config";

import { useTheme } from "../../hooks/useTheme";

import styles from "./Update.module.css";

export default function Update({ recipeData }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState(recipeData.title);
  const [cookingTime, setCookingTime] = useState(
    Number(recipeData.cookingTime.split(" ")[0])
  );
  const [method, setMethod] = useState(recipeData.method);
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState(recipeData.ingredients);
  const ingredientInput = useRef(null);

  const { mode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(false);

    const doc = {
      title,
      cookingTime: cookingTime + " minutes",
      method,
      ingredients,
    };

    db.collection("recipes")
      .doc(recipeData.id)
      .update(doc)
      .then(() => {
        console.log("Document updated with ID: ", recipeData.id);
        setIsPending(false);
      })
      .catch((err) => {
        console.error("Error adding document: ", err.message);
        setIsPending(false);
        setError(err.message);
      });
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    const trimedIngredient = ingredient.trim();

    if (trimedIngredient && !ingredients.includes(trimedIngredient)) {
      setIngredients((prevIngredients) => {
        return [...prevIngredients, trimedIngredient];
      });
    }
    setIngredient("");
    ingredientInput.current.focus();
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    if (!isPending) {
      setIngredients((prevIngredients) => {
        return prevIngredients.filter((ingr) => {
          return ingr !== ingredientToRemove;
        });
      });
      ingredientInput.current.focus();
    }
  };

  return (
    <div className={styles.Update}>
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            disabled={isPending}
          ></input>
        </label>
        <label>
          <div className={styles.ingredients}>
            <span>Ingredients: </span>
            <div className={styles.ingredientList}>
              {ingredients &&
                ingredients.map((ingr) => {
                  return (
                    <span key={ingr} className={styles.ingredient}>
                      {ingr}{" "}
                      <a
                        href="#remove"
                        onClick={(e) => handleRemoveIngredient(ingr)}
                        className={`${styles.removeButton}${
                          isPending ? " " + styles.notallowed : ""
                        }`}
                      >
                        {isPending ? "!" : "x"}
                      </a>
                    </span>
                  );
                })}
            </div>

            <input
              type="text"
              onChange={(e) => setIngredient(e.target.value)}
              value={ingredient}
              ref={ingredientInput}
              disabled={isPending}
            />
            <button
              className={`${styles[mode]}${
                isPending ? " " + styles.disabled : ""
              }`}
              onClick={handleAddIngredient}
              disabled={isPending}
            >
              Add Ingredient
            </button>
          </div>
        </label>
        <label>
          <span>Cooking Time (minutes)</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
            disabled={isPending}
          ></input>
        </label>
        <label>
          <span>Method</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            rows="4"
            required
            disabled={isPending}
          ></textarea>
        </label>
        <button
          className={`${styles[mode]}${isPending ? " " + styles.disabled : ""}`}
          disabled={isPending}
        >
          Update Recipe
        </button>
        {error && <div className="error">An error has ocurred: {error}!</div>}
        {isPending && <p className="loading">Creating Recipes...</p>}
      </form>
    </div>
  );
}
