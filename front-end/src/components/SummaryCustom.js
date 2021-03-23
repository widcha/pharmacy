import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import pill from "../assets/icons/pill2.png";

const SummaryCustom = () => {
  const { capsule } = useSelector((state) => state.customOrder);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dose, setDose] = useState(1);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const res = capsule.map((val) => {
      return val.pricePerMl * val.qty;
    });
    const total = res.reduce((a, b) => a + b, 0);
    setTotalPrice(total);
    setDose(1);
  }, [capsule]);

  useEffect(() => {
    setGrandTotal(totalPrice * dose);
    if (totalPrice === 0) {
      setDose(1);
    }
  }, [totalPrice, dose]);

  const details = () => {
    return capsule.map((val) => {
      return (
        <div className="flex flex-col">
          <p className="flex items-center text-gray-600 mb-2 text-sm">
            <span className="w-5 h-5 p-1 mr-2 inline-flex items-center justify-center bg-blue-400 text-white rounded-full flex-shrink-0">
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
            <span>
              {val.qty} gram(s) of {val.product_name}
            </span>
          </p>
        </div>
      );
    });
  };

  const addDose = async () => {
    let check = 0;
    await capsule.forEach((val) => {
      if (val.product_stock_total <= val.qty * dose) {
        return (check += 1);
      }
    });
    console.log(check);
    if (check === 0) {
      setDose(dose + 1);
    } else {
      Swal.fire({
        icon: "error",
        title: `Insufficient Stock`,
      });
    }
  };

  return (
    <div className="flex flex-col border-2 rounded-xl shadow-md">
      <div className="flex ml-3 mt-2">
        <h1 className="text-gray-700 font-semibold text-2xl">
          Custom Order Summary
        </h1>
      </div>
      <div className="p-4 w-full">
        <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
            CUSTOM CAPSULE
          </h2>
          <div className="flex w-full border-b border-gray-200 leading-none mb-4 justify-center">
            <img src={pill} alt="not found" className="w-24 mt-4 mb-4" />
          </div>
          <div className="flex ">
            <div className="w-1/2">{details()}</div>
            <div className="w-1/2 border-l-2 flex flex-col justify-center items-center">
              <p className="font-semibold text-gray-700">
                Rp. {Math.ceil(totalPrice).toLocaleString()}
              </p>
              <p className="font-semibold text-gray-700">Per Capsule</p>
            </div>
          </div>
          <p className="text-sm tracking-widest title-font mt-2 font-medium">
            DOSE
          </p>
          <div class="flex flex-wrap my-4">
            <div class="flex w-8/12">
              <input
                disabled
                value={`${dose} Capsule`}
                type="text"
                class="bg-gray-100 text-sm font-bold text-gray-700 text-center focus:outline-none border border-gray-300 focus:border-gray-600 rounded-l-md w-full"
              />
            </div>
            <div class="flex flex-col w-4/12">
              <button
                class="text-gray-700 text-center text-md font-bold rounded-tr-md px-1 bg-white focus:bg-blue-200 focus:outline-none border border-gray-300 focus:border-blue-200"
                onClick={addDose}
              >
                +
              </button>
              <button
                class="text-gray-700 text-center transition duration-300 text-md font-bold rounded-br-md px-1 bg-white focus:bg-blue-200 focus:outline-none border border-gray-300 focus:border-blue-200"
                onClick={() => setDose(dose - 1)}
                disabled={dose === 1}
              >
                -
              </button>
            </div>
          </div>
          <div className="flex justify-between mb-5">
            <div className="text-xl font-semibold text-gray-700">Subtotal:</div>
            <div className="text-xl font-semibold text-gray-700">
              Rp. {grandTotal.toLocaleString()}
            </div>
          </div>
          <button className="flex items-center font-semibold text-white bg-blue-400 border-0 py-2 px-4 w-full focus:outline-none hover:bg-blue-500 rounded">
            Add to Cart
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-auto"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryCustom;
