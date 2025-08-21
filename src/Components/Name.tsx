export const Name = ({ name }: { name: string }) => {
  return (
    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-500 animate-textGradient text-center md:text-left leading-tight">
      {name}
    </h1>
  );
};
