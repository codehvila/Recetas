import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./NavbarSearch.module.css";

export default function NavbarSearch() {
  const [value, setValue] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    if (query !== null) {
      setValue(query);
    }
  }, [query]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const valueSpaceSplited = value && value.split(" ");
    const singleSpaced =
      valueSpaceSplited && valueSpaceSplited.filter((val) => val !== "");

    navigate(`/search?q=${singleSpaced.join("+")}`);
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
