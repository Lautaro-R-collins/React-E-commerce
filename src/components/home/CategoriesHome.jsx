import { Link } from "react-router-dom";

const categoriesData = [
  {
    name: "Tecnologia",
    image:
      "https://assets.cybermonday.com.ar/uploads/offers/519902/68ee98814b930_7371.png?w=500&h=375",
  },
  {
    name: "Ropa",
    image:
      "https://media.istockphoto.com/id/822666448/es/foto/ropa-deportiva-aislado-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=MqtdodssVwVFcKR-l70UCFl-GIqy-EpCE3mnEy2E8M0=",
  },
  {
    name: "Hogar",
    image:
      "https://media.istockphoto.com/id/1170786176/es/vector/vector-3d-realista-render-blanco-cuero-sof%C3%A1-de-oficina-de-lujo-couch-con-almohadas-en-estilo.jpg?s=612x612&w=0&k=20&c=y8kGIpdPzxoW2rbgK5mdjK93FqCFf11yLvkeUVuoLSA=",
  },
  {
    name: "Electrodomesticos",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR634_37unKEUH5gyjg-dVkKZN2yMiidHg0uA&s",
  },
];

export default function Categories() {
  return (
    <div className="w-full mt-10 px-3">
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {categoriesData.map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${cat.name.toLowerCase()}`}
              className="bg-white shadow-lg hover:shadow-xl rounded-2xl transition transform hover:scale-105 cursor-pointer flex flex-col justify-center items-center p-6"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-44 h-44 object-contain"
              />
              <p className="mt-4 font-semibold text-xl">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
