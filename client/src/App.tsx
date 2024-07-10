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
import Login from "./pages/static/Login";
import Register from "./pages/static/Register";
import { Toaster } from "sonner";
import { useAuth } from "./hooks/AuthContext";
import AddRecipe from "./pages/recipe/AddRecipe";

function App() {
  const { token } = useAuth();

  const renderHomePage = () => {
    if (token) return <Route index element={<Feed />} />;
    else return <Route index element={<Home />} />;
  };
  return (
    <BrowserRouter>
      <Toaster
        duration={2000}
        richColors
        position="top-center"
        toastOptions={{
          className: "font-gelionReg text-lg",
        }}
      />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          {renderHomePage()}

          <Route path="/recipes" element={<Recipes />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/saved" element={<Saved />} />

          <Route path="/addRecipe" element={<AddRecipe />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
