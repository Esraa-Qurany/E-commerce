import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";

export default function ProductCard({ productData }) {
  const { addToCart, setCart } = useContext(cartContext);
  const { addToWishlist, setWishlist, deleteWishlistItem } =
    useContext(wishlistContext);
  const [redHeart, setRedHeart] = useState(false);

  async function addProduct(productId) {
    const loadingToster = toast.loading("Waiting...");
    const data = await addToCart(productId);
    setCart(data);
    toast.dismiss(loadingToster);
    if (data.status === "success") {
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  }
  async function addWishlist(productId) {
    const loadingToster = toast.loading("Waiting...");
    const data = await addToWishlist(productId);
    toast.dismiss(loadingToster);
    if (data.status === "success") {
      setWishlist(data);
      toast.success(data?.message);
      setRedHeart(true);
    } else {
      toast.error(data?.message);
    }
  }

  async function deleteItem(productId) {
    const loadingToster = toast.loading("Waiting...");
    const data = await deleteWishlistItem(productId);
    toast.dismiss(loadingToster);
    toast.success(data?.message);
    setWishlist(data);
    setRedHeart(false);
  }

  return (
    <div className="relative group overflow-hidden p-4 rounded-xl hover:shadow-[1px_1px_10px_0px] hover:shadow-green-500 transition-all duration-200">
      <Toaster position="top-right" reverseOrder={false} />
      <Link to={`/product/${productData._id}`}>
        <div className="h-80 ">
          <img
            src={productData?.imageCover}
            alt={productData?.title}
            className="w-full h-full object-cover "
          />
        </div>
        <h2 className="py-3 text-green-500">{productData?.category.name}</h2>
        <h3 className=" font-medium line-clamp-1">{productData?.title}</h3>
        <div className="flex justify-between py-3">
          <p>{productData?.price} EGP</p>
          <div>
            <span className="text-yellow-400 px-1">
              <i className="fa-solid fa-star"></i>
            </span>
            {productData?.ratingsAverage}
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-end text-2xl pt-5">
        <button
          onClick={() => addProduct(productData._id)}
          type="button"
          className=" w-3/4 focus:outline-none text-white bg-green-500 hover:bg-green-600 rounded-md text-sm px-5 py-2.5 absolute -bottom-14 left-4 group-hover:bottom-3 transition-all duration-500 "
        >
          + Add
        </button>
        {redHeart == true ? (
          <button
            onClick={() => deleteItem(productData?._id)}
            className="text-red-600"
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        ) : (
          <button
            onClick={() => addWishlist(productData._id)}
            className="text-green-800"
          >
            <i className="fa-solid fa-heart"></i>
          </button>
        )}
      </div>
    </div>
  );
}
