import freshCart from "../../assets/freshcart-logo.53f7a424c3aedc30a0fb46dc2278137c.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  function handleNavClick() {
    setOpenNav(!openNav);
  }

  const { cart } = useContext(cartContext);
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogout() {
    setToken(null);
    navigate("/login");
    localStorage.clear();
  }

  return (
    <nav className="bg-gray-100 py-2 z-20 w-full fixed">
      <div className=" container m-auto p-2 md:flex justify-between">
        <div className="flex flex-col justify-between md:flex-row md:gap-2">
          <div className="flex justify-between">
            <img src={freshCart} alt="site logo" />
            <button
              onClick={() => handleNavClick()}
              className="md:hidden text-2xl border border-slate-600 text-slate-600 px-4 rounded-lg focus:outline focus:border-2 focus:border-slate-600 focus:outline-slate-600"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          {localStorage.getItem("token")?(<ul
            className={`flex ${
              openNav ? "h-48" : "h-0"
            } md:h-auto overflow-hidden transition-all duration-700 flex-col md:flex-row gap-2 justify-center items-center text-gray-600`}
          >
            <li>
              <NavLink to="/home" className=" capitalize ">
                home
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className=" capitalize">
                cart
              </NavLink>
            </li>
            <li>
              <NavLink to="/wishlist" className=" capitalize">
                wishlist
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className=" capitalize">
                products
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className=" capitalize">
                categories
              </NavLink>
            </li>
            <li>
              <NavLink to="/brands" className=" capitalize">
                brands
              </NavLink>
            </li>
          </ul>):(<div></div>)}
        </div>
        <div
          className={`${
            openNav ? "h-16" : "h-0"
          } md:h-auto overflow-hidden transition-all duration-700 md:flex`}
        >
          <div className="flex items-center justify-center flex-col md:flex-row md:gap-2 md:justify-between">
            {localStorage.getItem("token")? (<div className="flex items-center justify-center gap-3 ">
              <NavLink
                to="/cart"
                className=" relative capitalize text-2xl text-gray-600"
              >
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="bg-green-400 px-1 text-sm rounded-2xl absolute top-0 right-[-5px] text-white">
                  {cart?.numOfCartItems}
                </span>
              </NavLink>
            </div>):(<div></div>)}
            <ul className="flex flex-col md:flex-row md:gap-2 items-center justify-center text-gray-600">
              {!token ? (
                <>
                  <li>
                    <NavLink to="/login">login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">register</NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={handleLogout}>logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
