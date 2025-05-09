import Link from "next/link";
import Collections from "./components/Collections";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import TopProductsBlock from "./components/TopProducts";
import { BsArrowBarDown } from "react-icons/bs";

export default function Home() {
  

  return (
      <div className="">
        <Navigation opaque={false} home={true} />
        <Hero />
        <div className="page">
          <Collections />
          <div>
            <h2 className="flex my-15 text-4xl font-[900] justify-center">
              Top Products
            </h2>
            <div className="flex flex-wrap gap-5">
              <TopProductsBlock />
            </div>
          </div>
          <div className="my-5 flex justify-center">
            <Link href="/products">
              <button className="btn font-black text-xl hover:text-2xl hover:cursor">
                View All Products
              </button>
              <div className="flex text-3xl justify-center">
                <BsArrowBarDown />
              </div>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
  );
}
