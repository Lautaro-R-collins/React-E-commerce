import { Routes, Route } from "react-router-dom";
import Layout from "../src/layout/layout.jsx";
import "./App.css";

import { Home } from "./pages/Home.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
