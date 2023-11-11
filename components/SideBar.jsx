"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Image from "next/image";
import { useContext } from "react";
import { Separator } from "@/components/ui/separator";
import { MyContext } from "@lib/context/userContext";

const SideBar = () => {
  const { myData, setMyData } = useContext(MyContext);

  const router = useRouter();
  return (
    <div className="w-[240px]">
      <Sidebar className="" backgroundColor="rgba(0 ,0 ,0)">
        <Menu className="">
          <div className="flex flex-col h-screen justify-between">
            <div>
              <h1 className="text-3xl text-white font-bold font-sans py-4 px-4">
                Cook & Das
              </h1>
              <MenuItem
                className="font-semibold font-int mt-2 text-white hover:text-black"
                onClick={() => router.push("/")}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                }
              >
                {" "}
                Home{" "}
              </MenuItem>
              <Separator className="w-[210px] ml-4" />
              <MenuItem
                className={`font-semibold font-int text-white hover:text-black ${
                  !myData.isLogged && "hidden"
                }`}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                }
                onClick={() => router.push("/profile")}
              >
                {" "}
                Profile{" "}
              </MenuItem>
              <Separator className="w-[210px] ml-4 h-[0.1px]" />
              <SubMenu
                icon={
                  <svg
                    version="1.1"
                    id="_x32_"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsxlink="http://www.w3.org/1999/xlink"
                    width="28px"
                    height="28px"
                    viewBox="0 0 512 512"
                    xmlspace="preserve"
                    fill="white"
                    className="group-hover:fill-black"
                  >
                    <g>
                      <path
                        class="st0"
                        d="M50.57,55.239C27.758,29.036-13.992,53.833,4.68,95.145c12.438,27.563,36.469,94.922,70.016,143.438
		c33.563,48.516,69.328,43.328,105.453,55.078l25.953,13.422l177.547,204.204l35.906-31.234l0.188-0.156
		c-5.25-6.047-166.719-191.782-230.563-265.204C125.992,142.02,61.664,68.004,50.57,55.239z"
                      />
                      <path
                        class="st0"
                        d="M476.664,93.551l-61.938,71.266c-3.969,4.563-10.859,5.031-15.422,1.063l-2.203-1.906
		c-4.531-3.953-5.031-10.844-1.063-15.406l62.234-71.594c10.219-11.734,5.375-22.125-2.219-28.719
		c-7.578-6.578-18.531-9.938-28.75,1.813l-62.234,71.594c-3.953,4.547-10.859,5.031-15.406,1.063l-2.188-1.906
		c-4.563-3.953-5.047-10.859-1.094-15.406l61.953-71.266c18.297-21.031-12.297-46.375-30.156-25.828
		c-21.391,24.594-59.156,68.031-59.156,68.031c-33,37.688-32.5,55.344-27.844,80.078c3.781,19.938,9.328,34.281-11.156,57.844
		l-30.234,34.781l31.719,36.453l34.641-39.844c20.469-23.547,35.453-20.047,55.719-19.094c25.156,1.203,42.703-0.766,75.422-38.672
		c0,0,37.766-43.469,59.156-68.063C524.305,99.286,494.945,72.536,476.664,93.551z"
                      />
                      <polygon
                        class="st0"
                        points="185.758,322.692 49.102,479.88 85.211,511.286 219.055,357.348 191.508,325.661 	"
                      />
                    </g>
                  </svg>
                }
                label="Recipes"
                className="font-semibold font-inter text-white hover:text-black group"
              >
                <MenuItem
                  className="group font-semibold font-inter text-black "
                  onClick={() => router.push("/recipes/veg")}
                >
                  {" "}
                  Vegetarian{" "}
                </MenuItem>
                <Separator className="w-[210px] ml-4 bg-black" />
                <MenuItem
                  className="group font-semibold font-inter text-black "
                  onClick={() => router.push("/recipes/nonveg")}
                >
                  {" "}
                  Non Vegetarian{" "}
                </MenuItem>
              </SubMenu>
              <Separator className="w-[210px] ml-4 h-[0.1px]" />

              <MenuItem
                className={`font-semibold font-inter text-white hover:text-black ${
                  !myData.isLogged && "hidden"
                }`}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                }
                onClick={() => router.push("/posts")}
              >
                {" "}
                Posts{" "}
              </MenuItem>
              <Separator className="w-[210px] ml-4 h-[0.1px]" />
              <MenuItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                }
                className={`font-semibold font-inter text-white hover:text-black ${
                  !myData.isLogged && "hidden"
                }`}
                onClick={() => router.push("/bookmarks")}
              >
                Bookmarks
              </MenuItem>
            </div>
            <div className="">
              <Separator className="w-[210px] ml-4 h-[0.1px]" />
              <MenuItem
                className="text-white hover:text-black"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                }
                onClick={() => router.push("/login")}
              >
                {myData.isLogged ? "Logout" : "Login"}
              </MenuItem>
            </div>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
