import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuTriangleAlert } from "react-icons/lu";
import { loginService } from "../../services/authService.js";
import { useUser } from "../../context/userContext.jsx";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { setUserInfo, checkSession, userInfo } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const result = await loginService(data);

      setUserInfo(result.user);
      await checkSession();

      toast.success("Sesión iniciada correctamente");

      reset();
      setRedirect(true);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Email o contraseña incorrectos";

      toast.error(message);
    }
  };

  // Redirección basada en rol
  if (redirect) {
    if (userInfo?.isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return (
    <div className="px-4">
      <div className="shadow-2xl p-4 rounded-2xl w-full max-w-[420px] mx-auto">
        <h1 className="text-xl md:text-3xl font-bold mb-5 text-[#03265D]">
          Iniciá sesión
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                })}
                className="border p-2 rounded w-full pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#03265D]"
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

          {/* Botón */}
          <button
            type="submit"
            className="bg-[#03265D] text-white font-bold cursor-pointer p-2 rounded hover:bg-[#021a40] transition-colors"
          >
            Iniciar sesión
          </button>

          <div className="w-full h-px bg-[#03265D] my-4"></div>

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
    </div>
  );
};
