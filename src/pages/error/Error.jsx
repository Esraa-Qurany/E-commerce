import { Link } from "react-router-dom";
import error from "../../assets/error.png";

export default function Error() {

    document.title = "Error";


  return (
    <div className="flex flex-col items-center justify-center h-svh">
      <img src={error} alt="error 404" className="w-3/4 m-10 md:w-1/2" />
      <Link to="/home" className="text-blue-600 underline ">
        back to home
      </Link>
    </div>
  );
}
