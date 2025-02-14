import { createRoot } from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routing } from "./Routing/Routing.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import WishlistContextProvider from "./Context/WishlistContext.jsx";

const route = createBrowserRouter(routing);

createRoot(document.getElementById("root")).render(
  <WishlistContextProvider>
    <CartContextProvider>
      <RouterProvider router={route}>
        <App />
      </RouterProvider>
    </CartContextProvider>
  </WishlistContextProvider>
);
