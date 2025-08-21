import { Link } from "react-router-dom";
import { Aboutme } from "../Components/Aboutme";
import { Name } from "../Components/Name";
import { NavBar } from "../Components/NavBar";
import { Profile } from "../Components/Profile";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-l from-blue-300 transition-all duration-700">

      <div className="flex justify-between items-center p-6">
        <Name name="Mitron Studies" />
        <NavBar />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 px-10 md:px-20 py-16 items-center">
        <div className="col-span-4 space-y-6 text-center md:text-left">
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

        <div className="flex justify-center items-center col-span-2">
          <Profile />
        </div>
      </div>

      <div className="flex justify-center py-56 text-white">
        <p className="text-center text-sm md:text-base">
          © 2025 Mitron Studies. Empowering students worldwide.
        </p>
      </div>
    </div>
  );
}
