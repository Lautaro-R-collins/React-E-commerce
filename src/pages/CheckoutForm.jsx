import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useCart from "../context/useCart";
import axios from "axios";
import { LuTriangleAlert } from "react-icons/lu";

const COUNTRIES = [
  "Argentina",
  "Brasil",
  "Chile",
  "Uruguay",
  "Paraguay",
  "Bolivia",
  "Perú",
  "Colombia",
  "México",
  "España",
];

const SelectCountry = ({ register, error }) => (
  <div className="w-full">
    <select
      {...register("pais", {
        required: "Seleccioná un país",
      })}
      className="border p-2 rounded w-full bg-white cursor-pointer"
      defaultValue=""
    >
      <option value="" disabled>
        Seleccioná tu país
      </option>

      {COUNTRIES.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>

    {error && (
      <p className="text-red-500 mt-1 text-sm font-bold flex items-center gap-1">
        <LuTriangleAlert className="size-4" />
        {error.message}
      </p>
    )}
  </div>
);

const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  // PRECIO FINAL CON DESCUENTO
  const getFinalPrice = (product) => {
    if (product.discountActive && product.discount > 0) {
      return Math.round(
        product.price - (product.price * product.discount) / 100
      );
    }
    return product.price;
  };

  // TOTAL
  const totalPrice = cart.reduce(
    (acc, item) => acc + getFinalPrice(item.product) * item.quantity,
    0
  );

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);

    const order = {
      buyer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      shipping: {
        pais: data.pais,
        codigoPostal: data.codigoPostal,
        calle: data.calle,
        numero: data.numero,
        piso: data.piso,
      },
      items: cart.map(({ product, quantity }) => ({
        productId: product._id,
        quantity,
      })),
    };

    try {
      const { data: response } = await axios.post(
        "http://localhost:3000/api/orders",
        order
      );

      setOrderId(response.orderId);
      setModalOpen(true);
      clearCart();
    } catch (err) {
      console.error(err);
      setApiError("No se pudo procesar la compra. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-4">
        <div className="shadow-2xl p-6 rounded-2xl w-full max-w-[500px] mx-auto my-10">
          <h1 className="text-2xl font-bold mb-6 text-[#03265D]">
            Finalizar compra
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* === DATOS DEL COMPRADOR === */}
            <h3 className="font-bold text-[#03265D]">Datos del comprador</h3>

            <Input
              placeholder="Nombre completo"
              register={register("name", {
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "Nombre muy corto" },
              })}
              error={errors.name}
            />

            <Input
              type="email"
              placeholder="Email"
              register={register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email inválido",
                },
              })}
              error={errors.email}
            />

            <Input
              placeholder="Teléfono"
              register={register("phone", {
                required: "El teléfono es obligatorio",
                minLength: { value: 6, message: "Teléfono inválido" },
              })}
              error={errors.phone}
            />

            <div className="h-px bg-gray-300 my-2" />

            {/* === ENVÍO === */}
            <h3 className="font-bold text-[#03265D]">Dirección de envío</h3>

            <SelectCountry register={register} error={errors.pais} />

            <Input
              placeholder="Código Postal"
              register={register("codigoPostal", {
                required: "El código postal es obligatorio",
              })}
              error={errors.codigoPostal}
            />

            <Input
              placeholder="Calle"
              register={register("calle", {
                required: "La calle es obligatoria",
              })}
              error={errors.calle}
            />

            <div className="flex gap-2">
              <Input
                placeholder="Número"
                register={register("numero", {
                  required: "El número es obligatorio",
                })}
                error={errors.numero}
              />
              <input
                placeholder="Piso (opcional)"
                {...register("piso")}
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="h-px bg-gray-300 my-2" />

            {/* === RESUMEN === */}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>

            {apiError && (
              <p className="text-red-500 font-bold text-sm flex items-center gap-1">
                <LuTriangleAlert className="size-4" />
                {apiError}
              </p>
            )}

            <button
              type="submit"
              disabled={!isValid || loading}
              className={`font-bold cursor-pointer p-2 rounded transition-colors 
                ${
                  isValid && !loading
                    ? "bg-[#03265D] text-white hover:bg-[#021a40]"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
            >
              {loading ? "Procesando pago..." : "Confirmar pago"}
            </button>
          </form>
        </div>
      </div>

      {/* === MODAL === */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-sm text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4">¡Compra realizada!</h2>
            <p className="mb-6">
              Orden Nº{" "}
              <strong className="bg-[#03265D] text-white px-2 py-1 rounded">
                {orderId}
              </strong>
            </p>
            <button
              onClick={() => {
                setModalOpen(false);
                navigate("/");
              }}
              className="px-4 py-2 bg-[#03265D] text-white rounded font-semibold cursor-pointer"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;

/* === INPUT REUTILIZABLE === */
const Input = ({ type = "text", placeholder, register, error }) => (
  <div className="w-full">
    <input
      type={type}
      placeholder={placeholder}
      {...register}
      className="border p-2 rounded w-full"
    />
    {error && (
      <p className="text-red-500 mt-1 text-sm font-bold flex items-center gap-1">
        <LuTriangleAlert className="size-4" />
        {error.message}
      </p>
    )}
  </div>
);
