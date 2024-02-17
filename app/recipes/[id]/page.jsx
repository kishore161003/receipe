"use client";
import React, { useState, useEffect, useContext } from "react";
import { ScrollArea } from "@components/ui/scroll-area";
import { Separator } from "@components/ui/separator";
import { useSession } from "next-auth/react";

const RecipeDetailPage = ({ params }) => {
  const { data: session } = useSession(true);
  const [isLiked, setIsLiked] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [myData, setMyData] = useState([]);
  const [isIngredientsDrawerOpen, setIsIngredientsDrawerOpen] = useState(false);
  const [isStepsDrawerOpen, setIsStepsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          const user = await fetch(`/api/user/${session.user.email}`);
          const userData = await user.json();
          setMyData(userData);
          const bookmarkResponse = await fetch(
            `/api/bookmark/check/${userData[0]._id}/${params.id}`
          );
          const bookmarkData = await bookmarkResponse.json();
          console.log(bookmarkData, "bookmarkData");
          setIsLiked(bookmarkData.bookmarked);
        }
        const recipeResponse = await fetch(`/api/recipes/${params.id}`);
        const recipeData = await recipeResponse.json();
        setRecipe(recipeData[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id, session]);

  console.log("mine", myData);

  const toggleIngredientsDrawer = () => {
    setIsIngredientsDrawerOpen(!isIngredientsDrawerOpen);
  };

  const toggleStepsDrawer = () => {
    setIsStepsDrawerOpen(!isStepsDrawerOpen);
  };

  return (
    <section className="container glassmorphism mt-8 h-[670px] w-[1200px] border-solid border-blue-600 shadow-xl text-gray-500 mx-auto">
      <div className="px-5 grid grid-cols-2 gap-8">
        <div className="col-span-1 pt-3">
          {/* Image */}
          <div className="mb-2 h-[600px] w-[600px]">
            <img
              src={recipe.images}
              alt="Recipe"
              className="rounded-lg shadow-md w-full border-2 h-full"
            />
          </div>
        </div>
        {/* Recipe Details */}
        <div className="col-span-1 px-4">
          <ScrollArea className="h-[600px]">
            <div className="flex justify-start items-center flex-col px-10 pt-20">
              <div className="flex items-start justify-between mb-4">
                {/* Name, Type, Time */}
                <div>
                  <div className="flex justify-between ">
                    <h1 className="text-3xl font-semibold mb-2">
                      Name: {recipe.recipeName}
                    </h1>
                    {session && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill={isLiked ? "black" : "none"}
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="cursor-pointer"
                        onClick={() => {
                          setIsLiked(!isLiked);
                          const updateBookmark = async () => {
                            try {
                              const res = await fetch(
                                `/api/bookmark/${myData[0]._id}/${params.id}`
                              );
                              // Handle the response as needed
                            } catch (error) {
                              console.error("Error updating bookmark:", error);
                            }
                          };
                          updateBookmark();
                        }}
                      >
                        <g>
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </g>
                      </svg>
                    )}
                  </div>
                  <Separator className="w-[400px] ml-0 mb-4 mt-2 h-[0.15rem] bg-black" />
                  <p className="text-2xl font-semibold mt-5 mb-5">
                    Type: {recipe.type}
                  </p>
                  <Separator className="w-[400px] ml-0 mb-4 mt-2 h-[0.15rem] bg-black" />

                  <p className="text-2xl font-semibold">
                    Time Required: {recipe.timeRequired}
                  </p>
                </div>

                {/* Like Button */}
              </div>
            </div>
            {/* Ingredients */}
            <Separator className="w-[400px] ml-14 mb-4 mt-2 h-[0.15rem] bg-black" />

            <div className="px-14">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold">Ingredients</h2>
                <button
                  onClick={toggleIngredientsDrawer}
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  {isIngredientsDrawerOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-up"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-down"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </button>
              </div>
              {isIngredientsDrawerOpen && (
                <div className="mt-3">
                  {recipe.ingredients && (
                    <ul className="list-none ml-4">
                      {recipe.ingredients
                        .split("\n")
                        .map((ingredient, index) => (
                          <li className="mb-2" key={index}>
                            {ingredient}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            <Separator className="w-[400px] ml-14 mb-4 mt-5 h-[0.15rem] bg-black" />

            {/* Steps */}
            <div className="px-14">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold">Steps</h2>
                <button
                  onClick={toggleStepsDrawer}
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  {isStepsDrawerOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-up"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-down"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </button>
              </div>
              {isStepsDrawerOpen && (
                <div className="ml-1 mt-3">
                  {recipe.steps && (
                    <ul className="list-none ml-4">
                      {recipe.steps.split("\n").map((step, index) => (
                        <li key={index} className="mb-2">
                          {step}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};
export default RecipeDetailPage;
