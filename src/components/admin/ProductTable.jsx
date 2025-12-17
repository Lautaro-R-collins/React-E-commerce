import { useProduct } from "../../context/productContext.jsx";

const ProductTable = ({ onEdit }) => {
  const { products, loading, deleteProduct } = useProduct();

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="w-full px-4 md:px-32 my-4 bg-white">
      <h2 className="text-xl font-bold text-[#03265D]">
        Productos Registrados
      </h2>
      <div className="overflow-x-auto rounded-xl ">
        <table className="table">
          <thead>
            <tr className="text-[#03265D]">
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>{p.isActive ? "Sí" : "No"}</td>
                <td className="flex gap-2">
                  <button
                    className="bg-[#03265D] text-white font-bold cursor-pointer p-2 rounded hover:bg-[#021a40] transition-colors"
                    onClick={() => onEdit(p)}
                  >
                    Editar
                  </button>

                  <button
                    className="bg-[#03265D] text-white font-bold cursor-pointer p-2 rounded hover:bg-[#021a40] transition-colors"
                    onClick={() => deleteProduct(p._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
