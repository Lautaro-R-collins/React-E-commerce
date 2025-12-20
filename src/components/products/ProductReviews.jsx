import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext.jsx";
import { getReviews, createReview } from "../../services/reviewService.js";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      getReviews(productId).then((data) => setReviews(data));
    }
  }, [productId]);

  const handleSubmitReview = async () => {
    if (!comment.trim()) return;
    await createReview(productId, { rating, comment });

    const updated = await getReviews(productId);
    setReviews(updated);

    setComment("");
    setRating(5);
  };

  return (
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
                        className="mask mask-star bg-yellow-500"
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
  );
};

export default ProductReviews;
