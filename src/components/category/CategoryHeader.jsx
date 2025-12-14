export default function CategoryHeader({ backgroundImage }) {
  return (
    <div className="relative w-full h-28 md:h-80 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
    </div>
  );
}
