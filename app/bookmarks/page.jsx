"use client";
import React from "react";
import { MyContext } from "@lib/context/userContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import RecipeCard from "@components/RecipeCard";
import { ScrollArea } from "@components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession(true);
  const router = useRouter();
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const bookmark = async () => {
      if (!session) {
        router.push("/");
      } else {
        const myData = await fetch(`/api/user/${session.user.email}`);
        const myDataJson = await myData.json();
        const res = await fetch(`/api/bookmark/${myDataJson[0]._id}`);
        const data = await res.json();
        setUserRecipes(data);
        console.log(data);
      }
    };
    bookmark();
  }, [session]);

  return (
    <section className="w-full ml-12">
      <h1 className="head_text text-left">
        <span className="blue_gradient ">Bookmarks</span>
      </h1>
      <p className="desc text-left">
        Bookmark others culinary adventures! Save and organize your favorite
        recipes effortlessly. Explore a world of flavors at your fingertips.
      </p>
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
