export default function BrandsCard({ brandData, setBrandId }) {
  return (
    <div
      onClick={() => setBrandId(brandData._id)}
      className=" h-64 border rounded-xl hover:shadow-[1px_1px_10px_0px] hover:shadow-green-500 transition-all duration-200"
    >
      <div className="h-52 ">
        <img
          src={brandData?.image}
          alt={brandData?.name}
          className="w-full h-full rounded-xl "
        />
      </div>
      <h1 className=" text-md text-center text-green-500">{brandData?.name}</h1>
    </div>
  );
}
