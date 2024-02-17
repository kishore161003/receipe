"use client";
import { MyContext } from "@lib/context/userContext";
import { useContext } from "react";
import { ScrollArea } from "@components/ui/scroll-area";
import RecipeCard from "@components/RecipeCard";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { data: session } = useSession(true);
  const [myData, setMyData] = useState(null);
  const router = useRouter();

  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!session) {
        router.push("/");
      } else {
        const res = await fetch(`/api/profile/${session.user.email}`);
        const res2 = await fetch(`/api/user/${session.user.email}`);
        const data = await res.json();
        const data2 = await res2.json();
        setUserRecipes(data);
        setMyData(data2);
        console.log(data2);
        console.log(data);
      }
    };
    fetchRecipes();
  }, [session]);
  const desc = "I am a Beginer in Cooking";
  return (
    <section className="w-full ml-12">
      <h1 className="head_text text-left max-w-2xl">
        <span className="blue_gradient ">
          {" "}
          Welcome to
          <br />
          {myData && myData[0].username} Profile
        </span>
        <br />
        <p className="desc mb-0 mt-2">{myData && myData[0].desc}</p>
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
