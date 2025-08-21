
export const Card = ({ link }: { link: string }) => {
  return (
    <div className="w-full sm:w-60 md:w-72 lg:w-80 h-48 sm:h-56 md:h-64 bg-white/10 rounded-xl text-center flex items-center justify-center p-4 sm:p-6 shadow-md shadow-black/40 hover:cursor-pointer hover:scale-105 transition-transform duration-300">
      <span className="text-sm sm:text-base md:text-lg font-medium text-white break-words">
        {link}
      </span>
    </div>
  );
};
