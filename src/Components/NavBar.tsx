import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Study", path: "/study" },
    { label: "Admin", path: "/admin" },
    { label: "contact", path: "/contact" },
  ];

  return (
    <div className="relative flex justify-center items-center min-h-[120px]">
      <div
        className="bg-gradient-to-tr from-red-600 to-blue-800 h-16 w-16 sm:h-20 sm:w-20 rounded-full shadow-lg flex items-center justify-center cursor-pointer text-white font-bold text-base sm:text-lg z-20 transition-transform duration-300 hover:scale-110"
        onClick={() => setOpen(!open)}
      >
        Menu
      </div>

      <div
        className={`absolute top-full mt-4 flex flex-col items-center space-y-3 transition-all duration-500 ease-in-out ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {menuItems.map((item) => (
          <div
            key={item.label}
            className="bg-gradient-to-tr from-blue-800 to--800 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer text-sm sm:text-base w-32 text-center"
            onClick={() => {
              navigate(item.path);
              setOpen(false); 
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
