import React, {useState} from "react";
import capsules from "../assets/icons/capsules.svg";
import {api_url} from "../helpers";
import ImagesModal from "./ImagesModal";

const ImagesCard = ({
  transaction_invoice_number,
  status,
  modName,
  imageUrl,
  username,
  recipes_id,
  user_id,
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ImagesModal
        showmodal={showModal}
        toggle={toggleModal}
        modalName={modName}
        invoice={transaction_invoice_number ? transaction_invoice_number : ""}
        name={username}
        imageUrl={imageUrl}
        recipes_id={recipes_id}
        user_id={user_id}
        status={status}
      />
      <div
        style={{
          maxHeight: "300px",
          minWidth: "230px",
        }}
        class="flex-shrink-0 m-2.5 relative overflow-hidden bg-gray-50 rounded-lg max-w-xs shadow-lg"
      >
        <svg
          class="absolute bottom-0 left-0 mb-8"
          viewBox="0 0 375 283"
          fill="none"
          style={{transform: "scale(1.5)", opacity: 0.1}}
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
        <div class="relative pt-3 flex items-center justify-center">
          <img
            class="relative w-40"
            src={`${api_url}${imageUrl}`}
            alt=""
            style={{height: "175px", width: "230px"}}
          />
        </div>
        <div class="relative text-gray-800 px-6 pb-6 mt-6">
          {modName === "Order Confirmation" ? (
            <span class="block opacity-75 text-gray-800">
              {transaction_invoice_number}
            </span>
          ) : (
            <span class="block opacity-75 -mb-1 text-gray-800">{status}</span>
          )}
          <div class="flex justify-between mt-1">
            {modName === "Order Confirmation" ? (
              <div className="flex flex-col">
                <span class="block font-semibold text-sm">
                  User: {username}
                </span>
                <span class="block font-semibold text-lg">{status}</span>
              </div>
            ) : (
              <span class="block font-semibold text-lg">{username}</span>
            )}
            <span class="block bg-blue-300 rounded-full text-gray-900 text-xs font-bold px-3 py-2 leading-none flex items-center">
              <button onClick={toggleModal} class="focus:outline-none">
                Detail
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagesCard;
