import React from "react";

const CardCustomOrder = ({ name, stock, qty, image, addBtn, decBtn }) => {
  const counterBtn = () => {
    return (
      <div class="flex flex-wrap">
        <div class="flex w-8/12">
          <input
            disabled
            type="text"
            value={`${qty} gr`}
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
            Stock: {stock.toLocaleString()} gram
          </div>
        </div>
        <div></div>
      </div>
      <div class="p-2">{counterBtn()}</div>
    </div>
  );
};

export default CardCustomOrder;
