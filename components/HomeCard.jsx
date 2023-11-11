import React from "react";
import Image from "next/image";

const HomeCard = ({ desc, position, src }) => {
  return (
    <div
      className={`flex gap-2 ${position} justify-between glassmorphism w-[900px] items-center shadow-xl mb-2`}
    >
      <img
        src={src}
        alt="img"
        className="h-[200px] w-[250px] rounded-lg mr-10"
      />
      <p className="text-xl desc max-w-lg text-center font-satoshi">{desc}</p>
    </div>
  );
};

export default HomeCard;
