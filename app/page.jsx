"use client";
import Footer from "@components/Footer";
import { useRouter } from "next/navigation";
import HomeCard from "@components/HomeCard";

const Home = () => {
  const router = useRouter();
  return (
    <div>
      <section className="w-full  flex-center flex-col mt-4 ">
        <h1 className="head_text text-center ">
          Explore flavors
          <br className="max-md:hidden" />
          <span className="blue_gradient "> share recipes, connect. </span>
        </h1>
        <p className="desc text-center">
          "Share the joy of cooking, create memories in every recipe."
        </p>
        <button
          className="black_btn mt-4"
          onClick={() => {
            router.push("/recipes/veg");
          }}
        >
          <span className="mr-2">Get Started</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </section>
      <section className="mt-6 p-2 gap-4 flex flex-col items-center">
        <HomeCard
          src={"img1.jpg"}
          desc={
            "Indulge in the joy of sharing recipes, where every dish is a story waiting to be told. Connect, create, and savor the delight of culinary camaraderie with our recipe-sharing community."
          }
          position={"mr-2"}
        />
        <HomeCard
          src={"chicken.jpg"}
          desc={
            "In the language of food, sharing is the melody, and caring is the harmony. Together, they create a symphony of flavors that nourish not just the body but also the soul. Join us in the celebration of culinary kindness and the joy of shared meals."
          }
          position={"flex-row-reverse"}
        />
        <HomeCard
          src={"Ramen.jpg"}
          desc={
            "Embark on a journey of flavors, where every dish is a passport to a new culinary destination. Discover the world on your plate and savor the richness of diversity in every bite !"
          }
          position={"mr-2"}
        />
      </section>
      <footer className="mt-4">
        <Footer />
      </footer>
    </div>
  );
};
export default Home;
