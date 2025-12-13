// eslint-disable-next-line no-unused-vars
function CardFeature({ icon: Icon, title, description }) {
  return (
    <div className="flex items-center max-w-[320px] bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow gap-4">
      <Icon size={56} className="text-[#03265D] shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}

export default CardFeature;
