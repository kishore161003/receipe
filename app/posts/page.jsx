"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { useContext } from "react";
import { MyContext } from "@lib/context/userContext";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const [post, setPost] = useState({
    name: "",
    ingredients: "",
    steps: "",
    time: "",
    type: "",
    userId: "",
  });

  return (
    <div className="h-screen w-full">
      <Form type="Create" post={post} setPost={setPost} />
    </div>
  );
};

export default Page;
