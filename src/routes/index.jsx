import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Login from "../layouts/Login";
import Register from "../layouts/Register";
import Navbar from "../layouts/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <div className="pt-16">
          <Home />
        </div>
      </>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <>
        <Navbar />
        <div className="pt-16">
          <ProductDetails />
        </div>
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <div className="pt-16">
          <Login />
        </div>
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <div className="pt-16">
          <Register />
        </div>
      </>
    ),
  },
]);

export default router; 