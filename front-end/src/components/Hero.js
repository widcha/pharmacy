import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Med from "../assets/images/pexels-chokniti-khongchum-3938023.jpg";

export const Hero = () => {
  const { user_id } = useSelector((state) => state.user);
  return (
    <div className="relative pl-5 flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
      <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
        <svg
          className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z" />
        </svg>
        <img
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
          src={Med}
          alt=""
        />
      </div>
      <div className="relative flex flex-col items-start w-full max-w-xl px-4 md:px-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-white uppercase rounded-full bg-blue-400">
            Payless, get more.
          </p>
          <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
            The best way
            <br className="hidden md:block" />
            to get your{" "}
            <span className="inline-block text-blue-500">prescription.</span>
          </h2>
          <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
            Pharma offers products and services to help you lead a healthy,
            happy life. Visit our online pharmacy, shop now, or find a store
            near you.
          </p>
          <div className="flex items-center">
            <Link to="/signup">
              <button
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                disabled={user_id !== 0}
              >
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
