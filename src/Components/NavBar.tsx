import { useState } from "react";

export function NavBar() {
  const [open, setOpen] = useState(false);

  // menu items to show around the circle
  const menuItems = ["Home", "Study", "About", "Contact"];

  return (
    <div className="relative flex justify-center items-center">
      {/* central navbar button */}
      <div
        className="bg-gradient-to-tr from-red-600 to-blue-800 h-20 w-20 rounded-xl shadow-yellow-300 shadow-xl flex items-center justify-center cursor-pointer text-white font-bold text-lg z-10 transition-transform duration-300 hover:scale-105"
        onClick={() => setOpen(!open)}
      >
        Menu
      </div>

      {/* circular expanding menu */}
      {menuItems.map((item, index) => {
        const angle = (index / menuItems.length) * 2 * Math.PI; // spread evenly in circle
        const distance = open ? 80 : 0; // distance from center
        const x = distance * Math.cos(angle);
        const y = distance * Math.sin(angle);

        return (
          <div
            key={item}
            className="absolute bg-indigo-500 text-white px-4 py-2 rounded shadow-lg cursor-pointer transition-all duration-500 ease-out flex items-center justify-center"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              opacity: open ? 1 : 0,
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
