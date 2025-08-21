export function Profile() {
  return (
    <div
      className="relative h-36 w-36 rounded-full p-1 
                 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 
                 bg-[length:200%_200%] animate-gradient
                 flex items-center justify-center shadow-lg 
                 transition-transform duration-500 ease-in-out hover:scale-105"
    >
      <div className="bg-slate-800 h-full w-full rounded-full 
                      flex items-center justify-center 
                      text-white text-3xl font-bold">
        MS
      </div>
    </div>
  );
}
