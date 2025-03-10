import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "../../../constant/conastant";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {  useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import { Button } from "flowbite-react";

export default function Login() {
  document.title = "Login";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(UserContext);

  const userSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("The input is required"),
    password: Yup.string().required("The input is required"),
  });
  const handleLogin = async (values) => {
    const loadingToster = toast.loading("Waiting...");
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/auth/signin`,
        values
      );
      setLoading(false);
      toast.success(data.message);
      toast.dismiss(loadingToster);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (errors) {
      setLoading(false);
      if (errors?.response.data.errors) {
        toast.error(errors?.response.data.errors.msg);
        toast.dismiss(loadingToster);
      } else {
        toast.error(errors?.response.data.message);
        toast.dismiss(loadingToster);
        setLoading(false);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: userSchema,
  });

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={formik.handleSubmit}
        className="container mx-auto p-5 pt-36"
      >
        <h1 className="text-3xl mb-5 text-gray-700">Login Now :</h1>
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
            htmlFor="password"
            className="block m-2 text-sm font-medium text-gray-700 dark:text-white"
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
        <div className="flex flex-col md:flex-row justify-between">
          <Link to="/ForgetPassword">
            <p className="text-xl pb-3 font-medium hover:text-green-500">
              forget your password ?
            </p>
          </Link>
          {loading ? (
            <Button
              className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center"
              isProcessing
            >
              Login
            </Button>
          ) : (
            <button
              type="submit"
              className=" text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Login
            </button>
          )}
        </div>
      </form>
    </>
  );
}
