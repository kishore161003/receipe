"use client";
import RecipeCard from "@components/RecipeCard";
import { ScrollArea } from "@components/ui/scroll-area";
import { set } from "mongoose";
import { useState, useEffect } from "react";

const Page = () => {
  const [userRecipes, setUserRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    const recipes = async () => {
      const res = await fetch(`/api/Recipe/nonveg`);
      console.log(res);
      const data = await res.json();
      console.log(data);
      setUserRecipes(data);
      setTemp(data);
    };
    recipes();
  }, []);

  async function fetchSearchtData(search) {
    console.log("searchtext", search);
    if (search.length == 0) {
      setUserRecipes(temp);
      return;
    }

    try {
      const res = await fetch(`/api/recipes/search/nonveg/${search}`);
      const data = await res.json();
      if (res.status == 404) {
        setUserRecipes([]);
        return;
      }

      if (JSON.stringify(userRecipes) === JSON.stringify(data)) return;
      setUserRecipes(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const search = e.target.value;
    // debounce the search function
    debounce(() => {
      // fetch the data
      fetchSearchtData(search);
    }, 500)();
  };

  return (
    <section className="w-full ml-12">
      <h1 className="head_text text-left">
        <span className="blue_gradient "> Non Vegetarian Food Recipes</span>
      </h1>
      <form className="relative w-[1190px] mt-10 mb-0 flex-center">
        <input
          type="text"
          name="search"
          onChange={handleSearchChange}
          value={searchText}
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
            {userRecipes &&
              userRecipes.map((recipe) => (
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

function debounce(func, delay) {
  // Initialize a timer variable
  let timer;
  // Return the new function
  return function () {
    // Get the context and arguments of the function
    let context = this;
    let args = arguments;
    // Clear the previous timer
    clearTimeout(timer);
    // Set a new timer
    timer = setTimeout(function () {
      // Call the original function with the context and arguments
      func.apply(context, args);
    }, delay); // Pass in the delay in milliseconds
  };
}
