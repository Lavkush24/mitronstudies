export function Aboutme({ detail, thought }: { detail: string; thought: string }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Detail text */}
      <p className="text-lg md:text-xl text-white-700 leading-relaxed tracking-wide">
        {detail}
      </p>

      {/* Thought / Highlight */}
      <p className="text-2xl md:text-3xl font-semibold text-indigo-700 tracking-wide">
        {thought}
      </p>

      {/* Optional decorative line */}
      <div className="w-20 h-1 bg-indigo-300 rounded-full mt-2"></div>
    </div>
  );
}
