import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/navBar.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex grow px-4 justify-center items-start">
        <Outlet />
      </main>
    </div>
  );
}
