export const Name = ({ name }: { name: string }) => {
  return (
    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-500 animate-textGradient">
      {name}
    </h1>
  );
};
