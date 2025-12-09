import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../context/productContext.jsx";
import useCart from "../context/useCart.js";
import ItemCount from "../components/products/ItemCount.jsx";
import { LuX } from "react-icons/lu";
import CardProduct from "../components/products/CardProduct.jsx";
import { getReviews, createReview } from "../services/reviewService.js";
import { useUser } from "../context/userContext.jsx";

export const DetailProduct = () => {
  const { id } = useParams();
  const { product, productLoading, error, getProductById, products } =
    useProduct();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const [quantitySelected, setQuantitySelected] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomOpen, setZoomOpen] = useState(false);

  /** REVIEWS STATE **/
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      getProductById(id);
      getReviews(id).then((data) => setReviews(data));
    }
  }, [id, getProductById]);

  const handleSubmitReview = async () => {
    if (!comment.trim()) return;
    await createReview(product._id, { rating, comment });

    const updated = await getReviews(product._id);
    setReviews(updated);

    setComment("");
    setRating(5);
  };

  if (productLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-xl font-semibold">Cargando el producto...</p>
      </div>
    );
  }

  if (error || !product?._id) {
    return (
      <p className="text-center py-10 text-red-500">Producto no encontrado</p>
    );
  }

  /** RELATED PRODUCTS **/
  const relatedProducts = products
    ?.filter((p) => p.category === product.category && p._id !== product._id)
    ?.slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">{product.name}</h2>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ==== GALERIA ==== */}
        <div className="lg:w-1/2 flex flex-col lg:flex-row gap-4">
          {product.images?.length > 1 && (
            <div className="hidden lg:flex flex-col gap-2 w-24 max-h-[450px] overflow-y-auto">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail-${idx}`}
                  className="w-20 h-20 object-cover cursor-pointer hover:opacity-80 transition"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}

          <div className="w-full flex justify-center">
            <div className="w-full max-w-md h-[300px] flex items-center justify-center">
              <img
                src={selectedImage || product.images?.[0]}
                alt={product.name}
                className="max-h-full max-w-full object-contain cursor-zoom-in"
                onClick={() => setZoomOpen(true)}
              />
            </div>
          </div>

          {product.images?.length > 1 && (
            <div className="flex lg:hidden gap-2 mt-3 justify-center flex-wrap">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail-${idx}`}
                  className="w-20 h-20 object-cover cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ==== INFO PRODUCTO ==== */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <p className="text-gray-700 text-lg">{product.description}</p>
          <p className="text-3xl font-bold">${product.price}</p>

          <p className="text-green-600 font-semibold">
            Stock disponible: {product.stock}
          </p>

          <p className="text-gray-600 text-sm">Marca: {product.brand}</p>
          <p className="text-gray-600 text-sm">Categoría: {product.category}</p>

          <div className="mt-4 flex flex-col gap-4">
            {product.stock === 0 ? (
              <button className="btn btn-disabled w-full">Sin stock</button>
            ) : (
              <>
                <div className="flex justify-start">
                  <ItemCount
                    stock={product.stock}
                    count={quantitySelected}
                    setCount={setQuantitySelected}
                  />
                </div>

                <div className="flex w-full gap-4">
                  <button
                    className="bg-[#03265D] cursor-pointer text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-[#02193d] transition-colors flex items-center justify-center gap-2"
                    onClick={() => addItem(product, quantitySelected)}
                  >
                    Agregar al carrito
                  </button>

                  <button
                    className="bg-[#03265D] cursor-pointer text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-[#02193d] transition-colors flex items-center justify-center gap-2"
                    onClick={() => {
                      addItem(product, quantitySelected);
                      navigate("/checkout");
                    }}
                  >
                    Comprar ahora
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ==== ZOOM ==== */}
      {zoomOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-3xl p-2 cursor-pointer hover:opacity-70 transition"
            onClick={() => setZoomOpen(false)}
          >
            <LuX />
          </button>
          <div
            className="cursor-zoom-out flex items-center justify-center w-full h-full"
            onClick={() => setZoomOpen(false)}
          >
            <img
              src={selectedImage || product.images?.[0]}
              alt="zoomed"
              className="max-h-[90%] max-w-[90%] object-contain cursor-default"
            />
          </div>
        </div>
      )}

      {/* ==== REVIEWS ==== */}
      <div className="mt-12 pt-6">
        <h3 className="text-2xl font-bold mb-4">Reseñas</h3>

        {reviews.length === 0 ? (
          <p>No hay reseñas todavía.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((r) => (
              <div key={r._id} className="border-none bg-gray-200 p-4 rounded">
                <p className="font-semibold">
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">{r.username}</span>
                    <div className="rating rating-sm">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <input
                          key={n}
                          type="radio"
                          className="mask mask-star-2 bg-yellow-500"
                          readOnly
                          checked={r.rating === n}
                        />
                      ))}
                    </div>
                  </div>
                </p>
                <p>{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Formulario */}
        {isAuthenticated() ? (
          <div className="mt-6">
            <h4 className="font-semibold">Escribir reseña:</h4>
            <div className="rating rating-md mt-2 flex">
              {[1, 2, 3, 4, 5].map((num) => (
                <input
                  key={num}
                  type="radio"
                  name="rating"
                  className="mask mask-star bg-yellow-500"
                  checked={rating === num}
                  onChange={() => setRating(num)}
                />
              ))}
            </div>

            <textarea
              className="bg-gray-200 rounded p-2 w-full mt-2"
              placeholder="Comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              className="bg-[#03265D] text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-[#02193d] transition-colors"
              onClick={handleSubmitReview}
            >
              Publicar reseña
            </button>
          </div>
        ) : (
          <p className="mt-4">
            Debes{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              iniciar sesión
            </span>{" "}
            para dejar reseñas.
          </p>
        )}
      </div>

      {/* ==== PRODUCTOS RELACIONADOS ==== */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">Productos relacionados</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center px-4">
            {relatedProducts.map((item) => (
              <CardProduct key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
