import React from "react";

const CardCustomOrder = ({
  name,
  stock,
  qty,
  image,
  addBtn,
  decBtn,
  deleteBtn,
  pricePerMl,
}) => {
  const counterBtn = () => {
    return (
      <div class="flex flex-wrap">
        <div class="flex w-8/12">
          <input
            disabled
            type="text"
            value={`${qty} ml`}
            class="bg-gray-100 text-sm font-bold text-gray-700 text-center focus:outline-none border border-gray-300 focus:border-gray-600 rounded-l-md w-full"
          />
        </div>
        <div class="flex flex-col w-4/12">
          <button
            class="text-gray-700 text-center text-md font-bold rounded-tr-md px-1 bg-white focus:bg-blue-200 focus:outline-none border border-gray-300 focus:border-blue-200"
            onClick={addBtn}
          >
            +
          </button>
          <button
            class="text-gray-700 text-center transition duration-300 text-md font-bold rounded-br-md px-1 bg-white focus:bg-blue-200 focus:outline-none border border-gray-300 focus:border-blue-200"
            onClick={decBtn}
          >
            -
          </button>
        </div>
      </div>
    );
  };
  return (
    <div class="bg-white w-full flex items-center p-2 rounded-xl shadow border">
      <div class="flex items-center space-x-4">
        <img
          src={`http://localhost:5000${image}`}
          alt="My profile"
          class="w-16 h-16"
        />
      </div>
      <div class="flex-grow p-3">
        <div>
          <div class="font-semibold text-gray-700">{name}</div>
          <div class="text-sm font-semibold text-gray-500">
            Stock: {stock.toLocaleString()} ml
          </div>
          <div class="text-sm font-semibold text-gray-500">
            Price: Rp. {pricePerMl.toLocaleString()} / ml
          </div>
        </div>
      </div>
      <div class="p-2">{counterBtn()}</div>
      <div>
        <button className="mx-3 pt-2 focus:outline-none" onClick={deleteBtn}>
          <svg
            class="w-8 h-8 text-gray-800 hover:text-red-400 rounded transition duration-200"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardCustomOrder;
