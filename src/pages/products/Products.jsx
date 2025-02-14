import axios from "axios";
import { baseUrl } from "../../constant/conastant";
import ProductCard from "../../component/productCard/ProductCard";
import { useEffect, useState } from "react";
import ProductSkeleton from "../../component/productCard/ProductSkeleton";

export default function Products() {
  useEffect(() => {
    document.title = "Products component";
  }, []);

  const [allProductData, setAllProductData] = useState([]);
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
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center pt-20 py-5">
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
