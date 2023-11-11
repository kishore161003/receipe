"use client";
import React from "react";
import { ScrollArea } from "@components/ui/scroll-area";
import { Separator } from "@components/ui/separator";
import { useState, useEffect } from "react";
import { MyContext } from "@lib/context/userContext";
import { useContext } from "react";

const page = ({ params }) => {
  const { myData, setMyData } = useContext(MyContext);
  const [isLiked, setIsLiked] = useState(false);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const getRecipe = async () => {
      const res = await fetch(`/api/recipes/${params.id}`);
      const data = await res.json();
      setRecipe(data[0]);
    };

    const bookmark = async () => {
      const res = await fetch(
        `/api/bookmark/check/${myData.data._id}/${params.id}`
      );
      const data = await res.json();
      setIsLiked(data.bookmarked);
    };
    bookmark();
    getRecipe();
  }, []);
  // console.log(recipe.image, "HI");
  console.log(myData);
  return (
    <section>
      <div className="grid h-screen grid-cols-3">
        <div className="col-span-2 w-full flex flex-col pt-9 pb-2 pl-9 gap-4">
          <img
            src={recipe.images}
            alt="img"
            className="h-[450px] glassmorphism"
          />
          <Separator className="h-1 bg-black rounded-md" />
          <div className="flex flex-col gap-4 glassmorphism">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold desc-r">
                Name : {recipe && recipe.recipeName}
              </h1>
              {myData.isLogged && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={isLiked ? "black" : "none"}
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-heart"
                  onClick={() => {
                    setIsLiked(!isLiked);
                    const bookmark = async () => {
                      const res = await fetch(
                        `/api/bookmark/${myData.data._id}/${params.id}`
                      );
                    };
                    bookmark();
                  }}
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              )}
            </div>
            <h1 className="text-xl font-semibold desc-r">
              Type : {recipe && recipe.type}
            </h1>{" "}
            <h1 className="text-xl font-semibold desc-r">
              Time Required : {recipe && recipe.timeRequired}
            </h1>{" "}
          </div>
        </div>
        <div className="col-span-1 grid pl-9 pr-9 pt-4 gap-4 h-fit">
          <div className="glassmorphism h-fit">
            <h1 className="text-xl font-semibold">Steps :</h1>{" "}
            <ScrollArea className="h-[400px] mt-2 desc-r">
              {recipe && recipe.steps}
            </ScrollArea>
          </div>
          <div className="glassmorphism h-fit">
            <h1 className="text-xl font-semibold mb-2">Ingredients :</h1>{" "}
            <ScrollArea className="h-[120px] desc-r">
              {recipe && recipe.ingredients}
            </ScrollArea>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
