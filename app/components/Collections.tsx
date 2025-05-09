import Link from "next/link";
import React from "react";

const Collections = () => {
  return (
    <div className="grid sm:grid-cols-2 gap-1 w-full">
      <div
        className="flex justify-end items-end p-10 rounded-md relative h-[500px] bg-bottom bg-cover bg-no-repeat w-full"
        style={{
          backgroundImage: "url('/lucas-andrade-In-4crOJncY-unsplash.jpg')",
        }}
      >
        <Link href="/surfboards">
          <button className="btn bg-white p-5 rounded-full shadow-cyan-950 shadow-2xl hover:bg-black hover:text-white hover:p-6">
            Shop Surf &rarr;
          </button>
        </Link>
      </div>
      <div
        className="flex justify-end items-end p-10 rounded-md relative h-[500px] bg-right bg-cover bg-no-repeat w-full"
        style={{
          backgroundImage: "url('/tim-mossholder-DQ1X8J7rZjA-unsplash.jpg')",
        }}
      >
        <Link href="/skimboards">
          <button className="btn bg-white p-5 rounded-full shadow-cyan-950 shadow-2xl hover:bg-black hover:text-white hover:p-6">
            Shop Skim &rarr;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Collections;
