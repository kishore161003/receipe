"use client";
import RecipeCard from "@components/RecipeCard";
import { ScrollArea } from "@components/ui/scroll-area";
import { useState, useEffect } from "react";

const Page = () => {
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const recipes = async () => {
      const res = await fetch(`/api/Recipe/nonveg`);
      console.log(res);
      const data = await res.json();
      console.log(data);
      setUserRecipes(data);
    };
    recipes();
  }, []);

  return (
    <section className="w-full ml-12">
      <h1 className="head_text text-left">
        <span className="blue_gradient "> Non Vegetarian Food Recipes</span>
      </h1>
      <form className="relative w-[1190px] mt-10 mb-0 flex-center">
        <input
          type="text"
          name="search"
          placeholder="Search for a tasty recipe..."
          required
          className="search_input peer"
        />
      </form>
      {userRecipes == null || userRecipes.length === 0 ? (
        <div className="glassmorphism mt-8 h-[500px] w-[1190px] flex justify-center items-center border-solid border-blue-600 shadow-xl text-gray-500">
          No Recipes Found
        </div>
      ) : (
        <ScrollArea className="glassmorphism mt-8 h-[500px] w-[1190px] border-solid border-blue-600 shadow-xl text-gray-500">
          <div className="grid grid-cols-2  gap-4 sm:grid-cols-3">
            {userRecipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                id={recipe._id}
                name={recipe.recipeName}
                img={recipe.images}
                time={recipe.timeRequired}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </section>
  );
};

export default Page;
