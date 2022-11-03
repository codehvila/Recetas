import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import { useTheme } from "../../hooks/useTheme";

import styles from "./Create.module.css";

export default function Create() {
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [method, setMethod] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const { mode } = useTheme();

  const { postData, data, error } = useFetch(
    "http://localhost:3005/recipes",
    "POST"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setIsPending(false);
      navigate("/");
    }
  }, [data, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    postData({
      title,
      cookingTime: cookingTime + " minutes",
      ingredients,
      method,
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
    <div className={styles.Create}>
      <h2>Add a New Recipe</h2>
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
              {ingredients.map((ingr) => {
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
            rows="6"
            required
            disabled={isPending}
          ></textarea>
        </label>
        <button
          className={`${styles[mode]}${isPending ? " " + styles.disabled : ""}`}
          disabled={isPending}
        >
          Add Recipe
        </button>
        {error && <div className="error">An error has ocurred: {error}!</div>}
        {isPending && <p className="loading">Creating Recipes...</p>}
      </form>
    </div>
  );
}
