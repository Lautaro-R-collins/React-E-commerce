# E-commerce Full Stack en React

Proyecto de **e-commerce full stack** desarrollado con **React + Vite** en el frontend y **Node.js + Express + MongoDB** en el backend.  

## 🚀 Tecnologías utilizadas

### Frontend
- **React 18**
- **Vite**
- **React Router DOM**
- **Tailwind CSS**
- **Axios**
- **Swiper.js**
- **React Icons**
- **Context API + Hooks**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **Bcrypt**
- **CORS**
- **Dotenv**

---

## 📦 Funcionalidades principales

* 🏠 **Home**

  * Slider principal (carousel)
  * Categorías destacadas
  * Features informativas (envíos, pagos, seguridad)

* 🗂 **Categorías**

  * Listado de productos por categoría
  * Navegación dinámica

* 🔍 **Búsqueda**

  * Búsqueda de productos por texto
  * Estado vacío (empty state)

* 📄 **Detalle de producto**

  * Galería de imágenes con zoom
  * Precio con descuento
  * Stock disponible
  * Reseñas de usuarios
  * Productos relacionados

* 🛒 **Carrito**

  * Agregar / quitar productos
  * Control de cantidades
  * Persistencia de estado

* 👤 **Usuarios**

  * Registro
  * Login
  * Autenticación

---

## 🧠 Arquitectura del proyecto

El proyecto está organizado siguiendo una estructura clara y escalable:

```
src/
 ├── assets/          # Imágenes y recursos estáticos
 ├── components/      # Componentes reutilizables
 │    ├── home/
 │    ├── products/
 │    ├── ui/
 ├── context/         # Context API (user, cart, products)
 ├── mocks/           # Datos mockeados (home, categorías, sliders)
 ├── pages/           # Vistas principales (Home, Detail, Cart, etc.)
 ├── services/        # Llamadas a la API
 ├── routes/          # Definición de rutas
 └── main.jsx
```

### Principios aplicados

* Separación de responsabilidades
* Componentes pequeños y reutilizables
* Datos desacoplados de la UI (mocks)
* Código legible y mantenible

---

## 🎨 Estilos

Los estilos están realizados con **Tailwind CSS**, priorizando:

* Diseño responsive
* Clases utilitarias
* Consistencia visual
* Componentes reutilizables

---

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```
VITE_BACKEND_URL=http://localhost:3000/api
```

---

## ▶️ Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build de producción
npm run build
```

---

## 🎯 Objetivo del proyecto

Este proyecto fue creado con fines **educativos y de portfolio**, simulando un e-commerce real, aplicando patrones comunes de aplicaciones profesionales en React.

---

## 📌 Próximas mejoras

* Panel de administración
* Filtros avanzados
* Paginación
* Wishlist
* Checkout real

---

![ecommers](https://github.com/user-attachments/assets/fa73d857-c0fd-49f5-a6bd-24f9d7b07e73)


## 👨‍💻 Autor

Desarrollado por **Lautaro Rodríguez Collins**.

Proyecto en constante evolución 🚀
