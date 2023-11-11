import React from "react";
import { useRouter } from "next/navigation";

const RecipeCard = ({ id, name, img, time, profile }) => {
  const router = useRouter();
  return (
    <div
      className=" hover:cursor-pointer"
      onClick={() => router.push(`/recipes/${id}`)}
    >
      <div className="flex flex-col S justify-center glassmorphism  w-fit h-fit">
        <img src={img} alt="chicken" className="w-[340px] h-[200px]" />
        <div className="flex flex-col">
          <h1 className="desc text-black font-semibold">
            <span className="font-inter">Name :</span> {name}
          </h1>
          <h1 className="desc text-black font-semibold">
            <span className="font-inter">Time Required :</span> {time}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
