import { useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";

import styles from "./Create.module.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [method, setMethod] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, method, cookingTime);
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
    setIngredients((prevIngredients) => {
      return prevIngredients.filter((ingr) => {
        return ingr !== ingredientToRemove;
      });
    });
    ingredientInput.current.focus();
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
                      className={styles.removeButton}
                    >
                      x
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
            />
            <button onClick={handleAddIngredient}>Add Ingredient</button>
          </div>
        </label>

        <label>
          <span>Cooking Time (minutes)</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          ></input>
        </label>
        <label>
          <span>Method</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            rows="6"
            required
          ></textarea>
        </label>
        <button>Add Recipe</button>
      </form>
    </div>
  );
}
