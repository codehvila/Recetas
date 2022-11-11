import { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList";

import { db } from "../../firebase/firebase.config";

import styles from "./Home.module.css";

export default function Home() {
  const [recipes, setRecipes] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    db.collection("recipes")
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          setError("No recipes to show!");
          setIsPending(false);
        } else {
          let results = [];
          querySnapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
            setRecipes(results);
            setIsPending(false);
          });
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, []);

  return (
    <div className={styles.Home}>
      <h2>Home Recipes</h2>
      <div>
        {error && <p className="error">{error}</p>}
        {isPending && <p className={styles.spinner}>Loadding Recipes...</p>}
        {recipes && <RecipeList data={recipes} />}
      </div>
    </div>
  );
}
