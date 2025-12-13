import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/navBar.jsx";
import {Footer} from "../components/footer/footer.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="justify-center items-start">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
