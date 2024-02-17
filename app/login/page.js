"use client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { signIn } from "next-auth/react";

import { MyContext } from "@lib/context/userContext";

const Page = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [myData, setMyData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: myData.email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });
    setIsLoading(false);
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
          {isLoading ? "Signing In..." : "Sign In"}
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

export default Page;
