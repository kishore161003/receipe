import React from "react";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const Form = ({ handleSubmit, type, post, setPost }) => {
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
          onSubmit={handleSubmit}
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
              <Label htmlFor="r1" className="text-md font-bold text-slate-700">
                Vegtarian
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Non Vegtarian" id="r2" />
              <Label htmlFor="r2" className="text-md font-bold text-slate-700">
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
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </form>
      </section>
    </ScrollArea>
  );
};

export default Form;
