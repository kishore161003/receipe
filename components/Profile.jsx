"use client";
import { MyContext } from "@lib/context/userContext";
import { useContext } from "react";
import { ScrollArea } from "@components/ui/scroll-area";
import RecipeCard from "@components/RecipeCard";
import { useState, useEffect } from "react";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { myData, setMyData } = useContext(MyContext);
  console.log(myData);
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch(`/api/profile/${myData.data._id}`);
      const data = await res.json();
      setUserRecipes(data);
      console.log(data);
    };
    fetchRecipes();
  }, []);

  desc = "I am a Beginer in Cooking";
  return (
    <section className="w-full ml-12">
      <h1 className="head_text text-left max-w-2xl">
        <span className="blue_gradient ">
          {" "}
          Welcome to
          <br />
          {myData.user} Profile
        </span>
        <br />
        <p className="desc mb-0 mt-2">{myData.data.desc}</p>
      </h1>
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
                profile
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </section>
  );
};

export default Profile;
