import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./NavbarSearch.module.css";

export default function NavbarSearch() {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?q=${value}`);
    console.log("Input data: ", value);
  };
  return (
    <div className={styles.NavbarSearch}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="NavBarSearchInput">
          <input
            type="text"
            id="NavBarSearchInput"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder="Search Recipes ..."
          />
        </label>
      </form>
    </div>
  );
}
