import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../context/useCart";
import axios from "axios";

const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [shipping, setShipping] = useState({
    pais: "",
    codigoPostal: "",
    calle: "",
    numero: "",
    piso: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // CALCULA EL PRECIO FINAL 
  const getFinalPrice = (product) => {
    if (product.discountActive && product.discount > 0) {
      return Math.round(
        product.price - (product.price * product.discount) / 100
      );
    }
    return product.price;
  };

  //TOTAL CON DESCUENTOS
  const totalPrice = cart.reduce(
    (acc, item) => acc + getFinalPrice(item.product) * item.quantity,
    0
  );

  const handleBuyerChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!buyer.name || !buyer.email || !buyer.phone) {
      setError("Completa los datos personales del comprador.");
      return;
    }

    if (
      !shipping.pais ||
      !shipping.codigoPostal ||
      !shipping.calle ||
      !shipping.numero
    ) {
      setError("Completa los datos obligatorios de envío.");
      return;
    }

    setLoading(true);
    setError(null);

    // ARMAR ITEMS CON PRECIO FINAL
    const order = {
      buyer,
      shipping,
      items: cart.map(({ product, quantity }) => ({
        productId: product._id,
        name: product.name,
        price: getFinalPrice(product), 
        quantity,
      })),
      total: totalPrice, 
    };

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/orders",
        order
      );

      setOrderId(data.orderId);
      setModalOpen(true);
      clearCart();
    } catch (err) {
      console.error("Error creando la orden:", err);
      setError("Hubo un error al procesar la compra. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FORMULARIO */}
      <div className="px-2">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-2xl my-10 flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold text-center mb-4">
            Finalizar compra
          </h2>
          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {/* DATOS DEL COMPRADOR */}
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={buyer.name}
            onChange={handleBuyerChange}
            className="input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={buyer.email}
            onChange={handleBuyerChange}
            className="input"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={buyer.phone}
            onChange={handleBuyerChange}
            className="input"
            required
          />

          {/* DATOS DE ENVÍO */}
          <input
            type="text"
            name="pais"
            placeholder="País"
            value={shipping.pais}
            onChange={handleShippingChange}
            className="input"
            required
          />

          <input
            type="text"
            name="codigoPostal"
            placeholder="Código Postal"
            value={shipping.codigoPostal}
            onChange={handleShippingChange}
            className="input"
            required
          />

          <input
            type="text"
            name="calle"
            placeholder="Calle"
            value={shipping.calle}
            onChange={handleShippingChange}
            className="input"
            required
          />

          <div className="flex gap-2">
            <input
              type="text"
              name="numero"
              placeholder="Número"
              value={shipping.numero}
              onChange={handleShippingChange}
              className="input w-1/2"
              required
            />

            <input
              type="text"
              name="piso"
              placeholder="Piso (opcional)"
              value={shipping.piso}
              onChange={handleShippingChange}
              className="input w-1/2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-[#03265D] text-white rounded font-semibold cursor-pointer"
          >
            {loading ? "Procesando..." : "Confirmar compra"}
          </button>
        </form>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-sm text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4">¡Gracias por tu compra!</h2>
            <p className="text-lg mb-6">
              Tu número de orden es:{" "}
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
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
