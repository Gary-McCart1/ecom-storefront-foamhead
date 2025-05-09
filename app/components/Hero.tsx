import Link from "next/link";
import Stars from "./Stars";

const Hero = () => {
  return (
    <section
      className="relative h-[800px] bg-cover bg-no-repeat bg-right text-white flex justify-start items-center"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="m-5 border-white sm:ml-20 h-[300px]">
        <h1 className="hidden md:block text-5xl font-[900] w-full lg:w-3/4">
          Because Average Boards <br /> Don’t Make Legendary Riders.
        </h1>
        <h1 className="block md:hidden text-5xl font-[900]">
          Surf. Skim. Repeat.
        </h1>
        <p className="mt-5 w-full lg:w-2/3">
          High-performance surfboards and skimboards designed for riders who
          demand style, control, and the freedom to push limits on every wave.
        </p>
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          <button className="mt-5 btn bg-[#e89160] p-3 rounded-lg w-full font-[400]">
            <Link href="/products">Shop Foamhead Products &rarr;</Link>
          </button>

          {/* Mobile only: show just stars + review count */}
          <div className="flex md:hidden mt-1 w-full justify-center">
            <div className="flex items-center text-md">
              <div className="flex pr-2">
                <Stars num={"5"} />
              </div>
              <div className="pl-2">100+ Reviews</div>
            </div>
          </div>

          {/* Desktop only: show full layout */}
          <div className="hidden md:flex items-center justify-between mt-1 w-full">
            <p className="flex justify-center md:justify-end items-center md:w-2/5">
              <Stars num={"5"} /> 100+ Reviews
            </p>
            <p className="w-1/20 flex justify-center">|</p>
            <p className="w-3/6 flex justify-start">
              60-Day Moneyback Guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
