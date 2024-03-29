"use client";
import React from "react";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useUploadThing } from "@lib/uploadthing";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const Form = ({ type, post, setPost }) => {
  const [resume, setResume] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res2 = await fetch(`/api/user/${session.user.email}`);
      const data2 = await res2.json();
      setPost({ ...post, userId: data2[0]._id });
    };
    fetchRecipes();
  }, []);

  console.log(post.userId);

  const { startUpload } = useUploadThing("media");
  const createRecipe = async (img) => {
    const res = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([post, img]),
    });
    console.log(res, "res");
    if (res.status === 200) {
      router.push("/");
    } else {
      alert("Error creating recipe");
    }
  };

  const onSubmiter = async (e) => {
    e.preventDefault();
    setLoading(true);

    var imgUrl = "";
    var flag = false;
    if (resume) {
      flag = true;
      const imageRes = await startUpload(Array.from(resume));
      if (imageRes) {
        createRecipe(imageRes[0].url);
      }
    }
    if (!flag) {
      createRecipe("/default.jpg");
    }
    setLoading(false);
  };

  return (
    <ScrollArea className="h-screen">
      <section className="w-full max-w-full flex-start flex-col py-2 ml-32">
        <h1 className="head_text text-left blue_gradient">
          {type} Your Own Recipe
        </h1>
        <p className="desc text-left max-w-xl">
          {type} and share recipes, transforming ordinary ingredients into
          extraordinary experiences that linger on taste buds and create lasting
          memories.
        </p>
        <form
          onSubmit={onSubmiter}
          className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Recipe Name
            </span>
            <input
              id="recipeName"
              className="form_input"
              placeholder="Enter The Name of Your Recipe"
              value={post.name}
              onChange={(e) => setPost({ ...post, name: e.target.value })}
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="font-satoshi mb-2 font-semibold  text-base text-gray-700">
              Image
            </span>
            <input
              id="resume"
              onChange={(e) => setResume(e.target.files)}
              type="file"
              className="border-dotted file:bg-transparent file:border-hidden hover:file:border-dashed hover:file:border-gray-400 hover:file:rounded-md mt-4 w-full md:w-1/2"
              placeholder="Select"
            />
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Ingredients
            </span>
            <textarea
              className="form_textarea"
              placeholder="Enter the Ingredients"
              value={post.ingredients}
              onChange={(e) =>
                setPost({ ...post, ingredients: e.target.value })
              }
              required
            />
          </label>
          <RadioGroup
            className="flex gap-5"
            defaultValue="Vegtarian"
            value={post.type}
            onValueChange={(e) => setPost({ ...post, type: e })}
            required
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Vegtarian" id="r1" />
              <Label
                htmlFor="r1"
                className="text-md font-bold text-slate-700"
                required
              >
                Vegtarian
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Non Vegtarian" id="r2" />
              <Label
                htmlFor="r2"
                className="text-md font-bold text-slate-700"
                required
              >
                Non Vegtarian
              </Label>
            </div>
          </RadioGroup>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Steps
            </span>
            <textarea
              className="form_textarea"
              placeholder="Enter The Recipe"
              value={post.steps}
              onChange={(e) => setPost({ ...post, steps: e.target.value })}
              required
            />
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Time
            </span>
            <input
              className="form_input"
              placeholder="Time Required"
              value={post.time}
              onChange={(e) => setPost({ ...post, time: e.target.value })}
              required
            />
          </label>

          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>
            <button
              type="submit"
              className="px-5 py-1.5 text-sm rounded-full bg-primary-orange text-white font-semibold"
              onClick={onSubmiter}
            >
              {loading ? "posting..." : "post"}
            </button>
          </div>
        </form>
      </section>
    </ScrollArea>
  );
};

export default Form;
