import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  document.title = "Cart";
  const {
    getCartItem,
    deleteCartItem,
    updateCartItem,
    deleteAllCart,
    setCart,
  } = useContext(cartContext);

  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getCart() {
    setLoading(true);
    const data = await getCartItem();
    setCartDetails(data);
    setLoading(false);
  }
  async function deleteItem(productId) {
    const loadingToster = toast.loading("Waiting...");
    const data = await deleteCartItem(productId);
    toast.dismiss(loadingToster);
    toast.success("Product removed successfully to your Cart");
    setCartDetails(data);
    setLoading(false);
    setCart(data);
    getCart();
  }
  async function deleteCart() {
    const loadingToster = toast.loading("Waiting...");
    const data = await deleteAllCart();
    toast.dismiss(loadingToster);
    toast.success("Your Cart are removed successfully");
    setCartDetails(data);
    setLoading(false);
    setCart(data);
  }
  async function updateItem(productId, count) {
    const loadingToster = toast.loading("Waiting...");
    if (count < 1) {
      deleteItem(productId);
    }
    getCart();
    const data = await updateCartItem(productId, count);
    toast.dismiss(loadingToster);
    toast.success("The product are updated successfully");
    setCartDetails(data);
    setLoading(false);
  }

  useEffect(() => {
    getCart();
  }, []);
  return (
    <div className="pt-36 container md:px-15 mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-gray-100 rounded-md p-10">
        <div className="flex justify-between items-center pb-5">
          <h3 className="text-3xl font-medium">Cart Shop</h3>
          {loading ? (
            <div></div>
          ) : cartDetails?.data?.products.length > 0 ? (
            <Link to={"/checkout"}>
              <button className=" focus:outline-none text-white bg-blue-600 hover:bg-blue-700 rounded-md text-xl px-5 py-2.5">
                Check out
              </button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
        {loading ? (
          <h2 className="text-3xl font-medium">Your cart is empty</h2>
        ) : cartDetails?.data?.products.length > 0 ? (
          <>
            <div className="flex justify-between items-center text-xl font-medium pb-5">
              <h3>
                Total price :
                <span className="text-green-400 ps-1">
                  {cartDetails?.data?.totalCartPrice}
                </span>
              </h3>
              <p>
                Total number of items :
                <span className="text-green-400 ps-1">
                  {cartDetails?.numOfCartItems}
                </span>
              </p>
            </div>
            {cartDetails?.data?.products.map((product) => (
              <div
                key={product.product._id}
                className="flex flex-col md:flex-row  justify-between items-center py-4 border-b"
              >
                <div className="flex flex-col md:flex-row justify-between  items-center gap-4">
                  <img
                    className="p-2 md:w-28 xl:w-48"
                    src={product?.product?.imageCover}
                    alt={product?.product?.title}
                  />
                  <div>
                    <h3 className="text-xl font-medium py-2">
                      {product?.product?.title}
                    </h3>
                    <p className="font-medium">{product?.price}EGP</p>
                    <button
                      onClick={() => deleteItem(product.product._id)}
                      className="text-red-600 py-2.5 "
                    >
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <button
                    onClick={() =>
                      updateItem(product.product._id, product.count - 1)
                    }
                    className=" border border-green-400 rounded-md text-xl px-3 py-1.5"
                  >
                    -
                  </button>
                  <span>{product?.count}</span>
                  <button
                    onClick={() =>
                      updateItem(product.product._id, product.count + 1)
                    }
                    className=" border border-green-400 rounded-md text-xl px-3 py-1.5 "
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <button
                onClick={() => deleteCart()}
                className="border border-green-400 rounded-md text-xl mt-5 px-5 py-2.5"
              >
                Clear your Cart
              </button>
            </div>
          </>
        ) : (
          <h2 className="text-3xl font-medium">Your cart is empty</h2>
        )}
      </div>
    </div>
  );
}
