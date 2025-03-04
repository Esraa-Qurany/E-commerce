import axios from "axios";
import { baseUrl } from "../../constant/conastant";
import { useEffect, useState } from "react";
import CategoryCard from "../../component/CategoryCard/CategoryCard";
import CategorySkeleton from "../../component/CategoryCard/CategorySkeleton";

export default function Categories() {
  document.title = "Categories";

  const [allProductData, setAllProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getAllProduct() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/categories`);
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
    <div className="container mx-auto pt-28 ">
      <div className="p-2 grid sm:grid-cols-3 gap-5">
        {loading
          ? Array.from({ length: 10 }, (_, i) => <CategorySkeleton key={i} />)
          : allProductData.map((categoryData) => (
              <CategoryCard
                key={categoryData._id}
                categoryData={categoryData}
              />
            ))}
      </div>
    </div>
  );
}
