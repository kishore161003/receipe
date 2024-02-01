"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { useContext } from "react";
import { MyContext } from "@lib/context/userContext";

const Page = () => {
  const { myData, setMyData } = useContext(MyContext);

  const router = useRouter();
  const [post, setPost] = useState({
    name: "",
    ingredients: "",
    steps: "",
    time: "",
    type: "",
    userId: myData.data._id,
  });
  const [submitting, setSubmitting] = useState(false);
  const createRecipe = async (e) => {
    e.preventDefault();
    console.log(post);
    const res = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (res.status === 200) {
      router.push("/");
    } else {
      alert("Error creating recipe");
    }
  };

  return (
    <div className="h-screen w-full">
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        handleSubmit={createRecipe}
      />
    </div>
  );
};

export default Page;
