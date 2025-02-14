import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "../../../constant/conastant";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function ResetPassword() {
  useEffect(() => {
    document.title = "ResetPassword";
  }, []);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const userSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("The input is required"),
    newPassword: Yup.string()
      .required("The input is required")
      .matches(/^[A-Z][A-Za-z0-9!@#$%^&*]{5}/, "Please enter valid password"),
  });
  const handleResetPassword = async (values) => {
    const loadingToster = toast.loading("Waiting...");
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/v1/auth/resetPassword`,
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
      navigate("/home");
    } catch (errors) {
    console.log('errors :', errors);
      
      }
    }
  

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: handleResetPassword,
    validationSchema: userSchema,
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={formik.handleSubmit}
        className="container mx-auto p-5 pt-36"
      >
        <h1 className="text-3xl mb-5 text-gray-700">reset your account password :</h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block m-2 text-sm font-medium text-gray-700 dark:text-white"
          >
            email :
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
        <div className="mb-5">
          <label
            htmlFor="newPassword"
            className="block m-2 text-sm font-medium text-gray-700 dark:text-white"
          >
            new password :
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          <p className="text-red-600 text-sm ps-2">
            {formik.touched.newPassword && formik.errors.newPassword}
          </p>
        </div>
        <div className="flex justify-between">
          {!loading ? (
            <button
              type="submit"
              className=" text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
            >
              Reset Password
            </button>
          ) : (
            <button
              type="button"
              className=" text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
              disabled
            >
              Reset Password <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </div>
      </form>
    </>
  );
}
