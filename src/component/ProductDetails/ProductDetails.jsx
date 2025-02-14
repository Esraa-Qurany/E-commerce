import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../constant/conastant";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { cartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { wishlistContext } from "../../Context/WishlistContext";
import ProductDetailsSkeleton from './ProductDetailsSkeleton';

export default function ProductDetails() {
  const { productId } = useParams();
  const { addToCart, setCart } = useContext(cartContext);
  const { addToWishlist, setWishlist, deleteWishlistItem } =
    useContext(wishlistContext);

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redHeart, setRedHeart] = useState(false);
  async function getProductDetails() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/products/${productId}`
      );
      console.log("data :", data.data);
      setProductData(data.data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function addProduct(productId) {
    const loadingToster = toast.loading("Waiting...");
    const data = await addToCart(productId);
    toast.dismiss(loadingToster);
    if (data.status === "success") {
      setCart(data);
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
    const data = await deleteWishlistItem(productId);
    toast.success(data?.message);
    setLoading(false);
    setWishlist(data);
    setRedHeart(false);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div className=" container mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      {loading ? (
        <ProductDetailsSkeleton />
      ) : (
        <div className=" flex flex-col justify-around  items-center md:flex-row pt-28">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper w-80 ms-0"
          >
            {productData?.images?.map((img) => (
              <SwiperSlide key={img}>
                <img src={img} className="w-full" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="w-3/4 md:w-1/2">
            <h3 className="py-4 text-4xl font-medium">{productData?.title}</h3>
            <p>{productData?.description}</p>
            <div className="flex justify-between items-center py-4">
              <p>{productData?.price} EGP</p>
              <div>
                <span className="text-yellow-400 px-1">
                  <i className="fa-solid fa-star"></i>
                </span>
                {productData?.ratingsAverage}
              </div>
            </div>
            <div className="flex items-center justify-between text-3xl">
              <button
                onClick={() => addProduct(productData._id)}
                type="button"
                className=" w-3/4 ms-20 focus:outline-none text-white bg-green-500 hover:bg-green-600 rounded-md text-sm px-5 py-2.5 "
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
        </div>
      )}
    </div>
  );
}
