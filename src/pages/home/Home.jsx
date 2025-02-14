import axios from "axios";
import { baseUrl } from "../../constant/conastant";
import ProductCard from "../../component/productCard/ProductCard";
import { useEffect, useState } from "react";
import ProductSkeleton from "../../component/productCard/ProductSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import img1 from "../../assets/bags.jpg";
import img2 from "../../assets/music.jpg";
import imgSlider1 from "../../assets/babyCart.jpg";
import imgSlider2 from "../../assets/bag.jpg";
import imgSlider3 from "../../assets/accessories.jpg";

export default function Home() {
  useEffect(() => {
    document.title = "Home component";
  }, []);

  const [allProductData, setAllProductData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [search, setSearch] = useState(" ");
  const [loading, setLoading] = useState(false);
  async function getAllProduct() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/products`);
      setAllProductData(data.data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function getAllCategories() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/categories`);
      setAllCategories(data.data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllProduct(), getAllCategories();
  }, []);

  return (
    <div className="container mx-auto pt-32">
      <div className="flex flex-col md:flex-row justify-center">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper !mx-2 md:w-72 h-[480px] "
        >
          <SwiperSlide>
            <img
              src={imgSlider1}
              alt="babyCart"
              className="w-80 m-auto md:w-72"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={imgSlider2}
              alt="babyCart"
              className="w-80 m-auto md:w-72 "
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={imgSlider3}
              alt="babyCart"
              className="w-full h-96 text-center md:w-72 md:h-60 "
            />
          </SwiperSlide>
        </Swiper>
        <div className="h-60 px-2  md:w-80">
          <img src={img1} alt="bags" className="h-full w-full" />
          <img src={img2} alt="music" className="h-full w-full" />
        </div>
      </div>
      <div className="pt-80 md:pt-20">
        <Swiper
          slidesPerView={2}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 0,
            },
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper h-80"
        >
          {allCategories.map((categories) => (
            <SwiperSlide key={categories._id}>
              <img
                className="w-full h-60 object-cover"
                src={categories.image}
              />
              <p className="text-xl text-center font-semibold">
                {categories.name}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center py-5 ">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          className="w-3/4 border-gray-300 rounded-md outline-green-400 focus:border-green-400 active:border-green-400 focus:ring-green-500 "
          placeholder="search..."
        />
      </div>
      <div className="p-2 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {loading
          ? Array.from({ length: 20 }, (_, i) => <ProductSkeleton key={i} />)
          : allProductData
              .filter((productData) => {
                return productData?.title.includes(search);
              })
              .map((productData) => (
                <ProductCard key={productData._id} productData={productData} />
              ))}
      </div>
    </div>
  );
}
