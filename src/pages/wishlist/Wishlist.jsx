import { useContext, useEffect, useState } from "react";
import { wishlistContext } from "../../Context/WishlistContext";
import toast, { Toaster } from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";

export default function Wishlist() {
  const { getWishlistItem, deleteWishlistItem, setWishlist } =
    useContext(wishlistContext);
  const { addToCart, setCart } = useContext(cartContext);

  const [WishlistDetails, setWishlistDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getWishlist() {
    setLoading(true);
    const data = await getWishlistItem();
    setWishlistDetails(data);
    setLoading(false);
  }
  async function deleteItem(productId) {
    const data = await deleteWishlistItem(productId);
    toast.success(data?.message);
    setWishlistDetails(data);
    setLoading(false);
    setWishlist(data);
  }
  async function addProduct(productId) {
    const data = await addToCart(productId);
    if (data.status === "success") {
      setCart(data);
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  }
  useEffect(() => {
    document.title = "Wishlist component";
    getWishlist();
  }, []);

  return (
    <div className="pt-36 container mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-gray-100 rounded-md p-10">
        <h3 className="text-3xl font-medium">My Wish List</h3>
        {loading ? (
          <h2 className="text-2xl font-medium py-5">Your Wishlist is empty</h2>
        ) : WishlistDetails?.data.length > 0 ? (
          WishlistDetails?.data.map((product) => (
            <div
              key={product?._id}
              className=" flex flex-col md:flex-row justify-between items-center py-4 border-b"
            >
              <div className="flex flex-col md:flex-row items-center gap-4">
                <img
                  className="p-2 md:w-28 xl:w-48"
                  src={product?.imageCover}
                  alt={product?.title}
                />
                <div>
                  <h3 className="text-xl font-medium py-2">{product?.title}</h3>
                  <p className="font-medium text-green-600">
                    {product?.price} EGP
                  </p>
                  <button
                    onClick={() => deleteItem(product?._id)}
                    className="text-red-600 py-2.5 "
                  >
                    <i className="fa-solid fa-trash"></i> Remove
                  </button>
                </div>
              </div>
              <button
                onClick={() => addProduct(product._id)}
                className=" border border-green-400 rounded-md text-xl mt-5 px-5 py-2.5 "
              >
                Add To Cart
              </button>
            </div>
          ))
        ) : (
          <h2 className="text-2xl font-medium py-5">Your Wishlist is empty</h2>
        )}
      </div>
    </div>
  );
}
