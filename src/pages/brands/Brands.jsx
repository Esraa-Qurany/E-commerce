import axios from "axios";
import { baseUrl } from "../../constant/conastant";
import { useEffect, useState } from "react";
import BrandsCard from "../../component/BrandsCard/BrandsCard";
import BrandSkeleton from "../../component/BrandsCard/BrandSkeleton";
import { BrandDetails } from "../../component/BrandDetails/BrandDetails";

export default function Brands() {
  document.title = "Brands";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [brandId, setBrandId] = useState("");

  async function getAllProduct() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/brands`);
      setData(data.data);
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
    <div className="container mx-auto pt-24">
      <h1 className="font-semibold text-4xl text-center pb-10 text-green-500">
        All Brands
      </h1>
      <div onClick={() => setOpenModal(true)}>
        <div className="p-2 grid sm:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 10 }, (_, i) => <BrandSkeleton key={i} />)
            : data.map((brandData) => (
                <BrandsCard
                  setBrandId={setBrandId}
                  key={brandData._id}
                  brandData={brandData}
                />
              ))}
        </div>
      </div>
      <BrandDetails
        brandId={brandId}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
}
