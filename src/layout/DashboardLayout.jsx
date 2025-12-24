import { Outlet } from "react-router-dom";
import Footer from "../components/footer/footer.jsx";
import NavBar from "../components/navBar/navBar.jsx";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="justify-center items-start">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
