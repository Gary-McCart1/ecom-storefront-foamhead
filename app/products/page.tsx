import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

export default function Products() {
    return (
      <div className="">
        <Navigation opaque={true} home={false} />
        <div className="page">
          <div>
            <h2 className="flex mt-50 mb-15 text-4xl font-[900] justify-center">All Products</h2>
            <ProductList filter={""} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }