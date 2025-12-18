function AvatarUpload({ onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-lg font-semibold text-[#03265D]">
        Seleccionar una imagen de perfil
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="block w-full text-sm text-gray-700
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-[#03265D]/10 file:text-[#03265D]
                   hover:file:bg-[#03265D]/20 cursor-pointer"
      />
    </div>
  );
}

export default AvatarUpload;
