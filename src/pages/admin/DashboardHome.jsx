import { useState } from "react";
import ProductForm from "../../components/admin/ProductForm";
import ProductTable from "../../components/admin/ProductTable";

const DashboardHome = () => {
  const [productToEdit, setProductToEdit] = useState(null);

  return (
    <div className="space-y-8">
      <ProductForm
        productToEdit={productToEdit}
        onFinish={() => setProductToEdit(null)}
      />

      <ProductTable onEdit={setProductToEdit} />
    </div>
  );
};

export default DashboardHome;
