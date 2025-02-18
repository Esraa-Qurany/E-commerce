import axios from "axios";
import { useFormik } from "formik";
import { baseUrl } from "../../../constant/conastant";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Register() {
  useEffect(() => {
    document.title = "Register";
  }, []);

  const navigate = useNavigate();
  const [loading, setLoding] = useState(false);
  const handleRegister = async (values) => {
    const loadingToster = toast.loading("Waiting...");
    setLoding(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/auth/signup`,
        values
      );
      if (data.message == "success") {
        toast.success("The account created");
        toast.dismiss(loadingToster);
        setLoding(false);
      }
      navigate("/login");
    } catch (errors) {
      if (errors?.response.data.errors) {
        toast.error(errors?.response.data.errors.msg);
        toast.dismiss(loadingToster);
        setLoding(false);
      } else {
        toast.error(errors?.response.data.message);
        toast.dismiss(loadingToster);
        setLoding(false);
      }
    }
  };
  const userSchema = Yup.object().shape({
    name: Yup.string()
      .required("The input is required")
      .min(3, "Min length is 3")
      .max(15, "Max length is 15")
      .matches(
        /^[A-Z][a-z]*(?: [A-Z][a-z]*|-?[A-Z][a-z]*)*$/,
        "Please enter valid name"
      ),
    email: Yup.string()
      .email("Please enter valid email")
      .required("The input is required"),
    password: Yup.string()
      .required("The input is required")
      .matches(/^[A-Z][A-Za-z0-9!@#$%^&*]{5}/, "Please enter valid password"),
    rePassword: Yup.string()
      .required("The input is required")
      .oneOf([Yup.ref("password")], "Enter the same password"),
    phone: Yup.string()
      .required("The input is required")
      .matches(/^01[0-2,5][0-9]{8}$/, "Enter egyption number"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handleRegister,
    validationSchema: userSchema,
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={formik.handleSubmit}
        className="container mx-auto pt-36 p-5"
      >
        <h1 className="text-3xl mb-5 text-gray-700">Register Now :</h1>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block font-medium text-gray-700 dark:text-white"
          >
            Name :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          <p className="text-red-600 text-sm ps-2">
            {formik.touched.name && formik.errors.name}
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block  font-medium text-gray-700 dark:text-white capitalize"
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
            htmlFor="password"
            className="block font-medium text-gray-700 dark:text-white capitalize"
          >
            password :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          <p className="text-red-600 text-sm ps-2">
            {formik.touched.password && formik.errors.password}
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block font-medium text-gray-700 dark:text-white capitalize"
          >
            re password :
          </label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          <p className="text-red-600 text-sm ps-2">
            {formik.touched.rePassword && formik.errors.rePassword}
          </p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-white capitalize"
          >
            Phone :
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
          <p className=" text-red-600 text-sm ps-2">
            {formik.touched.phone && formik.errors.phone}
          </p>
        </div>
        <div className="flex justify-end">
          {!loading ? (
            <button
              type="submit"
              className=" text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
            >
              Register Now
            </button>
          ) : (
            <button
              type="button"
              className=" text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-400 dark:hover:bg-green-500 dark:focus:ring-green-600"
              disabled
            >
              Register Now<i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
        </div>
      </form>
    </>
  );
}
