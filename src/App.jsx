import { Routes, Route } from "react-router-dom";
import Layout from "../src/layout/layout.jsx";
import { UserProvider } from "./context/userContext.jsx";
import "./App.css";

// Routes pages
import { Home } from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
