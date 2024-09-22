import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto my-8 max-w-80 md:max-w-7xl">
        <ToastContainer />
        <Outlet />
      </main>
    </>
  );
};

export default App;
