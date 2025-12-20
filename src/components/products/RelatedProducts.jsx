import CardProduct from "./CardProduct.jsx";

const RelatedProducts = ({ relatedProducts }) => {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold mb-8">Productos relacionados</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center px-4">
        {relatedProducts.map((item) => (
          <CardProduct key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
