"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MyContext } from "@lib/context/userContext";

const page = () => {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const { myData, setMyData } = useContext(MyContext);

  const validate = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...myData, password }),
    });
    const data = await res.json();
    if (res.status === 200) {
      console.log(data);
      setMyData((prev) => ({
        email: data.email,
        user: data.username,
        data: data,
        isLogged: true,
      }));
      router.push("/");
    } else if (res.status === 400) {
      alert("Incorrect password");
    } else {
      alert("User not found");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="glassmorphism flex flex-col w-[440px]">
        <span className="font-satoshi font-semibold text-base text-gray-700">
          email
        </span>
        <input
          value={myData.email}
          onChange={(e) => {
            const value = e.target.value;
            setMyData((prev) => ({ ...prev, email: value }));
          }}
          id="user_email"
          className="form_input"
          placeholder="Enter The email"
          required
        />
        <span className="font-satoshi font-semibold text-base text-gray-700">
          password
        </span>
        <input
          value={password}
          onChange={(e) => {
            const value = e.target.value;
            setPassword((prev) => value);
          }}
          type="password"
          id="user_password"
          className="form_input"
          placeholder="Enter The password"
          required
        />
        <button className="black_btn" onClick={validate}>
          Sign In
        </button>
        <div className="flex flex-col items-center gap-1">
          <p className="text-lg text-zinc-600 mt-1">or</p>
          <p className="text-sm font-semibold">
            New User ...{" "}
            <span>
              <a href="/signup" className="underline text-blue-700">
                Sign Up
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
