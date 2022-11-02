import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
import Recipe from "./pages/recipe/Recipe";
import ThemeSelector from "./components/ThemeSelector";

import "./App.css";

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <NavBar />
          <ThemeSelector />
          <div className="appMain">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes/:recipeId" element={<Recipe />} />
              <Route path="/search" element={<Search />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </div>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
