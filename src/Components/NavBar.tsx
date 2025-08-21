import { useState } from "react";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const menuItems = ["Home", "Study", "About", "Contact"];

  return (
    <div className="relative flex justify-center items-center min-h-[120px]">
      <div
        className="bg-gradient-to-tr from-red-600 to-blue-800 h-16 w-16 sm:h-20 sm:w-20 rounded-full shadow-lg flex items-center justify-center cursor-pointer text-white font-bold text-base sm:text-lg z-10 transition-transform duration-300 hover:scale-110"
        onClick={() => setOpen(!open)}
      >
        Menu
      </div>

      {menuItems.map((item, index) => {
        const angle = (index / menuItems.length) * 2 * Math.PI;
        const distance = open ? 100 : 0; // larger spread
        const x = distance * Math.cos(angle);
        const y = distance * Math.sin(angle);

        return (
          <div
            key={item}
            className="absolute bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-md cursor-pointer transition-all duration-500 ease-out text-sm sm:text-base flex items-center justify-center"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
