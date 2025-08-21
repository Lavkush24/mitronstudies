

export function Aboutme({ detail, thought }: { detail: string; thought: string }) {
  return (
    <div className="space-y-6 animate-fadeIn px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 text-center md:text-left">
      <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed tracking-wide">
        {detail}
      </p>

      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-indigo-400 md:text-indigo-600 tracking-wide">
        {thought}
      </p>

      <div className="mx-auto md:mx-0 w-16 sm:w-20 lg:w-28 h-1 bg-indigo-400 rounded-full mt-2"></div>
    </div>
  );
}
