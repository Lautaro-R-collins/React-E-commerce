import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Datos del login:", data);
  };

  return (
    <div className="shadow-2xl p-5 rounded-2xl md:min-w-[420px]">
      <h1 className="text-xl md:text-3xl font-bold mb-5 text-[#03265D]">
        Iniciá sesión 
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Email inválido",
              },
            })}
            className="border p-2 rounded w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#03265D]"
          />
          {errors.email && (
            <p className="text-red-500 text-start mt-1 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Contraseña */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "Debe tener al menos 6 caracteres",
              },
            })}
            className="border p-2 rounded w-full pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#03265D]"
          />

          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>

          {errors.password && (
            <p className="text-red-500 text-start mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="bg-[#03265D] text-white font-bold cursor-pointer p-2 rounded hover:bg-[#021a40] transition-colors"
        >
          Iniciar sesión
        </button>

        <div className="w-full h-px bg-[#03265D] my-4"></div>

        {/* Link a registro */}
        <p className="text-gray-700 text-center">
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            className="text-[#03265D] font-semibold hover:underline"
          >
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
};
