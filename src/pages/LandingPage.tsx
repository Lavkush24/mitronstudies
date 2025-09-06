import { Link } from "react-router-dom";
import { Aboutme } from "../Components/Aboutme";
import { Name } from "../Components/Name";
import { Profile } from "../Components/Profile";

export function LandingPage() {
  return (
    <div className="ps-9 md:ps-32">
      <div className="flex justify-between items-center p-6">
        <Name name="Mitron Studies" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 px-8 md:px-15 py-16 items-center">
        <div className="col-span-4 space-y-4 space-x-4 text-center md:text-left">
          <div className="">
            <Aboutme
              detail="Helping students navigate learning with ease."
              thought="Learn smarter, not harder!"
            />
          </div>
          <div className="flex pt-32">
            <Link
              to="/study"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105"
            >
              Explore Study Material
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center col-span-3 space-x-6 md:col-span-2">
          <Profile nav={"admin"}/>
        </div>
      </div>

      <div className="flex justify-center py-24 text-white pb-0">
        <p className="text-center text-sm md:text-base">
          © 2025 Mitron Studies. Empowering students worldwide.
        </p>
      </div>
    </div>
  );
}
