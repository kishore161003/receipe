import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa"; // Assuming you're using react-icons for the delete icon

const RecipeCard = ({ id, name, img, time, profile }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async (event) => {
    event.stopPropagation();
    setIsDeleting(true);
    console.log("delete");
    const res = await fetch(`/api/delete/${id}`, {
      method: "DELETE",
    });
    setIsDeleting(false);
    setDeleted(true);

    console.log(res);
  };

  return (
    <div
      className="hover:cursor-pointer relative"
      onClick={() => router.push(`/recipes/${id}`)}
    >
      <div>
        <div className="flex flex-col justify-center  rounded-xl border border-gray-200 bg-slate-50/100 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur pb-5 pr-3 pl-5 pt-2 w-fit h-fit">
          {profile && (
            <div
              className="flex self-end mb-2 hover:cursor-pointer"
              onClick={handleDelete}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </div>
          )}
          <img src={img} alt="img" className="w-[340px] h-[200px] rounded-md" />
          <div className="flex flex-col">
            {isDeleting ? (
              <h1 className="mt-2 font-xl font-serif ">
                Deleting it Please wait ...
              </h1>
            ) : deleted ? (
              <h1 className="font-xl font-serif mt-2">
                {" "}
                Please Refresh to see Changes ...{" "}
              </h1>
            ) : (
              <div>
                {" "}
                <h1 className="desc text-black font-satoshi">
                  <span className="font-satoshi">Name :</span> {name}
                </h1>
                <h1 className="desc text-black font-times">
                  <span className="font-times">Time Required :</span> {time}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
