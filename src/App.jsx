import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context Providers
import AppProviders from "./app/AppProviders.jsx";
// Routes 
import AppRoutes from "./app/AppRoutes.jsx";

function App() {
  return (
    <AppProviders>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </AppProviders>
  );
}

export default App;
