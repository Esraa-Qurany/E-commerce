import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../constant/conastant";

export default function ForgetPassword() {
  useEffect(() => {
    document.title = "forgetPassword";
  }, []);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleForgetPassword = async (values) => {
    const loadingToster = toast.loading("Waiting...");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/auth/forgotPasswords`,
        values
      );
      if (data.statusMsg == "success") {
        toast.success(data.message);
      }
      if (data.statusMsg == "fail") {
        toast.success(data.message);
      }
      toast.dismiss(loadingToster);
      setLoading(false);
      navigate("/verifyCode");
    } catch (errors) {
      console.log("errors :", errors);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleForgetPassword,
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={formik.handleSubmit}
        className="container mx-auto p-5 pt-36"
      >
        <h1 className="text-3xl mb-5 text-gray-700">please enter your email</h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block m-2 text-sm font-medium text-gray-700 dark:text-white"
          >
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          <p className="text-red-600 text-sm ps-2">
            {formik.touched.email && formik.errors.email}
          </p>
        </div>
        <div className="flex justify-between">
          {!loading ? (
            <button
              type="submit"
              className=" text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
            >
              verify
            </button>
          ) : (
            <button
              type="button"
              className=" text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
              disabled
            >
              verify <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </div>
      </form>
    </>
  );
}
