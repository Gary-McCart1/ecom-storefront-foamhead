import Link from "next/link";

const CancelPageContent = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#d95f44]">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold">Payment Canceled</h1>
        <p className="mt-4 text-lg">
          Your payment was not completed. Please try again.
        </p>
        <p className="mt-6">
          <Link href="/cart">
            <button
              className="px-6 py-2 text-white bg-[#d95f44] rounded-lg hover:bg-black transition"
            >
              Go Back to Cart
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CancelPageContent;
