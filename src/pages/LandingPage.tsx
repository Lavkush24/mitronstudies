import { Profile } from "../Components/Profile";
import { NavBar } from "../Components/NavBar";
import { Aboutme } from "../Components/Aboutme";
import { Name } from "../Components/Name";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-l from-blue-300  transition-all duration-700">
      {/* Navbar */}
      <div className="flex justify-between items-center p-6">
        <Name name="Mitron Studies" />
        <NavBar />
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 px-10 md:px-20 py-16 items-center">
        {/* Left Content */}
        <div className="col-span-4 space-y-6">
          <Aboutme
            detail="Helping students navigate learning with ease."
            thought="Learn smarter, not harder!"
          />
          <Link
            to="/study"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105"
          >
            Explore Study Material
          </Link>
        </div>

        {/* Right Profile Image */}
        <div className="flex justify-center items-center col-span-2">
          <div >
            <Profile />
          </div>
        </div>
      </div>

      {/* Footer / Call-to-Action */}
      <div className="flex justify-center py-40 text-white-600">
        <p className="text-center  text-sm md:text-base">
          © 2025 Mitron Studies. Empowering students worldwide.
        </p>
      </div>
    </div>
  );
}
