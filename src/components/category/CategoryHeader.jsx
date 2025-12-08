export default function CategoryHeader({ title }) {
  const formattedTitle =
    title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();

  return (
    <div className="relative w-full h-24 flex items-center justify-center mb-6">
      {/* Background */}
      <div className="absolute inset-0 bg-[#031127] "></div>

      {/* Text */}
      <h1 className="relative text-4xl md:text-5xl font-bold text-white drop-shadow-md">
        {formattedTitle}
      </h1>
    </div>
  );
}
