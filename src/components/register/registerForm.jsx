import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../context/userContext.jsx";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuTriangleAlert } from "react-icons/lu";
import { registerService } from "../../services/authService.js";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange", 
  });

  const { userInfo, checkSession } = useUser();

  const onSubmit = async (data) => {
    const payload = {
      username: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    };

    await registerService(payload, reset);
    // Actualiza datos del usuario desde el backend
    await checkSession();
    // Redirección
    setRedirect(true);
  };

  // Redirección basada en rol
  if (redirect) {
    if (userInfo?.isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return (
    <div className="shadow-2xl p-5 rounded-2xl">
      <h1 className="text-xl md:text-3xl font-bold mb-5 text-[#03265D]">
        Registrate para poder comprar
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-md mx-auto"
      >
        {/* Nombre */}
        <div>
          <input
            type="text"
            placeholder="Nombre"
            {...register("firstName", { required: "El nombre es obligatorio" })}
            className="border p-2 rounded w-full"
          />
          {errors.firstName && (
            <p className="text-red-500 text-start mt-1 text-sm font-bold flex items-center gap-1">
              <LuTriangleAlert className="size-4" />
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Apellido */}
        <div>
          <input
            type="text"
            placeholder="Apellido"
            {...register("lastName", {
              required: "El apellido es obligatorio",
            })}
            className="border p-2 rounded w-full"
          />
          {errors.lastName && (
            <p className="text-red-500 text-start mt-1 text-sm font-bold flex items-center gap-1">
              <LuTriangleAlert className="size-4" />
              {errors.lastName.message}
            </p>
          )}
        </div>

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
            className="border p-2 rounded w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-start mt-1 text-sm font-bold flex items-center gap-1">
              <LuTriangleAlert className="size-4" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Contraseña */}
        <div className="relative min-h-[70px]">
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
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).+$/,
                  message: "Incluya mayúsculas y numeros",
                },
              })}
              className="border p-2 rounded w-full pr-10"
            />

            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && (
            <p className="text-red-500 text-start mt-1 text-sm font-bold flex items-center gap-1">
              <LuTriangleAlert className="size-4" />
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`font-bold p-2 rounded transition-colors 
    ${
      isValid
        ? "bg-[#03265D] text-white cursor-pointer hover:bg-[#021a40]"
        : "bg-gray-400 text-gray-200 cursor-not-allowed"
    }`}
        >
          Registrarse
        </button>

        <div className="w-full h-px bg-[#03265D] my-4"></div>

        <p className="text-gray-700 text-center">
          ¿Ya tenés cuenta?{" "}
          <Link
            to="/login"
            className="text-[#03265D] font-semibold hover:underline"
          >
            Iniciá sesión
          </Link>
        </p>
      </form>
    </div>
  );
};
