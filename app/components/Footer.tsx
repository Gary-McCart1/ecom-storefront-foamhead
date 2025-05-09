import Link from "next/link";

const Footer = () => {
    return (
      <footer className="bg-[#659f9c] text-white py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-20 gap-5">
          <Link href="/">
            <h2 className="text-4xl font-black">FOAMHEAD</h2>
            <h2 className="text-lg font-light mb-3">SURF. SWIM. CONQUER.</h2>
          </Link>
  
          <div>
            <h3 className="text-xl font-semibold mb-3">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/surfboards" className="hover:underline">Surfboards</Link></li>
              <li><Link href="/skimboards" className="hover:underline">Skimboards</Link></li>
            </ul>
          </div>
  
          <div>
            <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: gwmccart3@gmail.com</li>
              <li>Location: Venice Beach, CA</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Admin</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:underline">admin.site.com</li>
            </ul>
          </div>
        </div>
  
        <div className="border-t border-white/20 mt-10 pt-6 text-sm text-center text-white/70">
          © {new Date().getFullYear()} Foamhead Boards. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  