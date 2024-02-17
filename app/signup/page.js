"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setnewUser] = useState({
    username: "",
    email: "",
    password: "",
    desc: "",
  });

  const createUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (res.status === 200) {
      router.push("/login");
    } else {
      alert("Something went wrong. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="glassmorphism flex flex-col w-[440px]">
        {/* <div className="flex justify-evenly">
          <img
            src="/chicken.jpg"
            className="h-[96px] w-[96px] rounded-full"
          ></img>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            User Name
          </span>
        </div> */}
        <div>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            User Name
          </span>
          <input
            id="user_Name"
            value={newUser.username}
            onChange={(e) => {
              const value = e.target.value;
              setnewUser((prev) => ({ ...prev, username: value }));
            }}
            className="form_input"
            placeholder="Enter The User Name"
            required
          />
        </div>
        <div>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Description
          </span>
          <input
            id="user_Name"
            value={newUser.desc}
            onChange={(e) => {
              const value = e.target.value;
              setnewUser((prev) => ({ ...prev, desc: value }));
            }}
            className="form_input"
            placeholder="Describe About You"
            required
          />
        </div>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          email
        </span>
        <input
          id="user_email"
          value={newUser.email}
          onChange={(e) => {
            const value = e.target.value;
            setnewUser((prev) => ({ ...prev, email: value }));
          }}
          className="form_input"
          placeholder="Enter The email"
          required
        />
        <span className="font-satoshi font-semibold text-base text-gray-700">
          password
        </span>
        <input
          value={newUser.password}
          onChange={(e) => {
            const value = e.target.value;
            setnewUser((prev) => ({ ...prev, password: value }));
          }}
          type="password"
          id="user_password"
          className="form_input"
          placeholder="Enter The password"
          required
        />
        {/* <span className="font-satoshi font-semibold text-base text-gray-700">
          Confirm password
        </span>
        <input
          id="user_password"
          className="form_input"
          placeholder="Enter The password"
          required
        /> */}
        <button className="black_btn mt-2" onClick={createUser}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
        <div className="flex flex-col items-center gap-1">
          <p className="text-lg text-zinc-600 mt-1">or</p>
          <p className="text-sm font-semibold">
            Already has an Account ...{" "}
            <span>
              <a href="/login" className="underline text-blue-700">
                Log In
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
