import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { userAddProductToCartAction } from "../redux/actions/cartAction";

const CardProductUser = ({ name, price, id, img, qty, pricePerGram }) => {
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.user);
  const handleAddToCart = debounce(() => {
    if (user_id > 0) {
      dispatch(
        userAddProductToCartAction({
          user_id,
          product_id: id,
          product_qty: 1,
          product_price: pricePerGram,
        })
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "You need to login first",
      });
    }
  }, 200);
  return (
    <div class="flex-shrink-0 bg-blue-200m-6 relative overflow-hidden bg-gray-50 rounded-lg max-w-xs w-48 shadow-lg m-5">
      <svg
        class="absolute bottom-0 left-0 mb-8"
        viewBox="0 0 375 283"
        fill="none"
        style={{ transform: "scale(1.5)", opacity: 0.1 }}
      >
        <rect
          x="159.52"
          y="175"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill="white"
        />
        <rect
          y="107.48"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 0 107.48)"
          fill="white"
        />
      </svg>
      <Link to={`product/detail?id=${id}`}>
        <div class="relative pt-10 px-10 flex items-center justify-center">
          <div
            class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
            style={{
              background: "radial-gradient(black, transparent 60%)",
              transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
              opacity: 0.2,
            }}
          ></div>
          <img
            class="relative w-40"
            src={`http://localhost:5000${img}`}
            alt=""
          />
        </div>
      </Link>
      <div class="relative text-gray-800 px-6 pb-6 mt-6 space-y-3">
        <span class="block opacity-75 -mb-1 text-gray-800 font-semibold">
          {name}
        </span>
        <span class="bg-gray-300 rounded-full text-blue-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
          {`Rp ${pricePerGram}/ml`}
        </span>
        <div class="flex justify-between">
          <button
            className="flex justify-center items-center rounded-3xl focus:outline-none bg-teal-500 py-2 px-3 text-white text-sm font-semibold hover:bg-teal-600 w-full object-fill"
            onClick={handleAddToCart}
          >
            Add to &nbsp;
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductUser;
