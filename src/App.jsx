import { Routes, Route } from "react-router-dom";
import Layout from "../src/layout/layout.jsx";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
}

export default App;
