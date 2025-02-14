import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";

export default function CheckOut() {
  useEffect(() => {
    document.title = "Checkout component";
  }, []);

  const [loading, setLoading] = useState(false);
  const { CheckOut, cartId } = useContext(cartContext);

  const userSchema = Yup.object().shape({
    details: Yup.string().required("The input is required"),
    phone: Yup.string()
      .required("The input is required")
      .matches(/^01[0-2,5][0-9]{8}$/, "Enter egyption number"),
    city: Yup.string().required("The input is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: " ",
      phone: "",
      city: "",
    },
    onSubmit: () => handleCheckOut(cartId, "http://localhost:5173"),
    validationSchema: userSchema,
  });

  const handleCheckOut = async (cartId, URL) => {
    const loadingToster = toast.loading("Waiting...");
    const data = await CheckOut(cartId, URL, formik.values);
    if (data.status === "success") {
        toast.dismiss(loadingToster);
      window.location.href = data.session.url;
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={formik.handleSubmit}
        className="container mx-auto p-5 pt-36"
      >
        <h1 className="text-3xl mb-5 text-gray-700">Checkout Now :</h1>
        <div className="mb-5">
          <label
            htmlFor="details"
            className="block m-2 text-sm font-medium text-gray-700 dark:text-white"
          >
            details :
          </label>
          <input
            type="text"
            id="details"
            name="details"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          <p className="text-red-600 text-sm ps-2">
            {formik.touched.details && formik.errors.details}
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block m-2 text-sm font-medium text-gray-700 dark:text-white"
          >
            phone :
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          <p className="text-red-600 text-sm ps-2">
            {formik.touched.phone && formik.errors.phone}
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="city"
            className="block m-2 text-sm font-medium text-gray-700 dark:text-white"
          >
            city :
          </label>
          <input
            type="text"
            id="city"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          <p className="text-red-600 text-sm ps-2">
            {formik.touched.city && formik.errors.city}
          </p>
        </div>
        <div className="flex justify-between">
          {!loading ? (
            <button
              type="submit"
              className=" text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
            >
              pay
            </button>
          ) : (
            <button
              type="button"
              className=" text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
              disabled
            >
              pay <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </div>
      </form>
    </>
  );
}
