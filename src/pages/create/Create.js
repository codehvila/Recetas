import { useState } from "react";
import useFetch from "../../hooks/useFetch";

import styles from "./Create.module.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [method, setMethod] = useState("");

  console.log(title);
  console.log(cookingTime);
  console.log(method);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, method, cookingTime);
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
