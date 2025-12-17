import { useEffect, useState } from "react";
import { useProduct } from "../../context/productContext";
import { FaTrash } from "react-icons/fa";

const initialState = {
  name: "",
  description: "",
  price: 0,
  brand: "Genérico",
  images: [""],
  category: "",
  subcategory: "",
  subsubcategory: "",
  stock: 0,
  isActive: true,
  discount: 0,
  discountActive: false,
};

const ProductForm = ({ productToEdit, onFinish }) => {
  const { createProduct, updateProduct } = useProduct();
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  // CARGAR PRODUCTO A EDITAR

  useEffect(() => {
    if (productToEdit) {
      setForm({
        ...productToEdit,
        images: productToEdit.images.length ? productToEdit.images : [""],
      });
    } else {
      setForm(initialState);
    }
  }, [productToEdit]);

  // HANDLERS

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (index, value) => {
    const updated = [...form.images];
    updated[index] = value;
    setForm({ ...form, images: updated });
  };

  const addImage = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const removeImage = (index) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index),
    });
  };

  // SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      images: form.images.filter((img) => img.trim() !== ""),
      subcategory: form.subcategory?.trim() || null,
      subsubcategory: form.subsubcategory?.trim() || null,
    };

    try {
      if (productToEdit) {
        await updateProduct(productToEdit._id, payload);
      } else {
        await createProduct(payload);
      }

      onFinish();
      setForm(initialState);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 md:px-32 mt-4">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <h2 className="text-xl font-bold text-[#03265D]">
          {productToEdit ? "Editar producto" : "Crear producto"}
        </h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          className="input input-bordered w-full bg-gray-200 rounded"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="textarea textarea-bordered w-full bg-gray-200 rounded"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#03265D]">
              Precio
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Ej: 3500"
              className="input input-bordered bg-gray-200 rounded"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#03265D]">
              Stock disponible
            </label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Ej: 12"
              className="input input-bordered bg-gray-200 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Categoría"
            className="input input-bordered bg-gray-200 rounded"
          />
          <input
            name="subcategory"
            value={form.subcategory || ""}
            onChange={handleChange}
            placeholder="Subcategoría"
            className="input input-bordered bg-gray-200 rounded"
          />
          <input
            name="subsubcategory"
            value={form.subsubcategory || ""}
            onChange={handleChange}
            placeholder="Sub-subcategoría"
            className="input input-bordered bg-gray-200 rounded"
          />
        </div>

        {/* IMÁGENES */}
        <div className="space-y-2">
          <label className="font-medium">Imágenes</label>
          {form.images.map((img, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={img}
                onChange={(e) => handleImageChange(i, e.target.value)}
                placeholder="URL de imagen"
                className="input input-bordered w-full bg-gray-200 rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                title="Eliminar imagen"
                className="flex items-center justify-center"
              >
                <FaTrash className="text-2xl cursor-pointer text-red-500 hover:text-red-600" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-[#03265D] text-white font-bold cursor-pointer p-2 rounded hover:bg-[#021a40] transition-colors"
            onClick={addImage}
          >
            Agregar imagen
          </button>
        </div>

        {/* FLAGS */}
        <div className="flex gap-6">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="checkbox bg-green-200 rounded"
            />
            Activo
          </label>

          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="discountActive"
              checked={form.discountActive}
              onChange={handleChange}
              className="checkbox bg-green-200 rounded"
            />
            Descuento
          </label>
        </div>

        {form.discountActive && (
          <input
            name="discount"
            type="number"
            value={form.discount}
            onChange={handleChange}
            placeholder="% descuento"
            className="input input-bordered w-full bg-gray-200 rounded"
          />
        )}

        <div className="flex justify-start gap-2">
          <button
            type="submit"
            className="bg-[#03265D] text-white font-bold cursor-pointer p-2 rounded hover:bg-[#021a40] transition-colors"
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
