import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import Home from "./pages/static/Home";
import Feed from "./pages/static/Feed";
import Recipes from "./pages/static/Recipes";
import Shopping from "./pages/static/Shopping";
import MealPlanner from "./pages/static/MealPlanner";
import Communities from "./pages/static/Communities";
import Saved from "./pages/static/Saved";

function App() {
  const auth = false;

  const renderHomePage = () => {
    if (auth) return <Route index element={<Feed />} />;
    else return <Route index element={<Home />} />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          {renderHomePage()}

          <Route path="/recipes" element={<Recipes />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/saved" element={<Saved />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
