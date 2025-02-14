export default function CategoryCard({ categoryData }) {
  return (
    <div className=" border rounded-xl hover:shadow-[1px_1px_10px_0px] hover:shadow-green-500 transition-all duration-200">
      <div className="h-72 ">
        <img
          src={categoryData?.image}
          alt={categoryData?.name}
          className="w-full h-full object-cover rounded-xl "
        />
      </div>
      <h1 className="py-3 text-xl text-center font-bold text-green-500">
        {categoryData?.name}
      </h1>
    </div>
  );
}
