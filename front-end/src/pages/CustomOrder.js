import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import CardCustomOrder from "../components/CardCustomOrder";
import { api_url } from "../helpers";

const CustomOrder = () => {
  const { product_list } = useSelector((state) => state.product);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [container, setContainer] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const filterData = data.filter((val, index) => {
    return (
      val.product_name.toLocaleLowerCase().includes(name.toLocaleLowerCase()) &&
      index < 7
    );
  });

  const fetchData = async () => {
    const response = await axios.get(`${api_url}/product`);
    setData(response.data);
  };

  const addBtn = (value) => {
    const found = container.findIndex((val) => {
      return value.product_id === val.product_id;
    });
    console.log(found);
    if (found >= 0) {
      setName("");
      Swal.fire({
        icon: "error",
        title: `${value.product_name} already added`,
      });
    } else {
      setContainer([...container, { ...value, qty: 1 }]);
    }
    setName("");
  };

  const addQty = (index) => {
    let newState = [...container];
    newState[index].qty = newState[index].qty + 1;
    setContainer(newState);
  };

  const decQty = (index) => {
    let newState = [...container];
    if (newState[index].qty > 1) {
      newState[index].qty = newState[index].qty - 1;
      setContainer(newState);
    }
  };

  const searchComponent = () => {
    return (
      <div className="bg-white h-10 shadow flex rounded-xl border border-gray-200 focus:border-transparent">
        <input
          className="w-96 rounded-lg focus:outline-none focus:ring-blue-100 focus:ring-4 pl-3 font-semibold text-gray-700 transition duration-300"
          type="text"
          value={name}
          placeholder="Search and add your medicine here"
          onChange={(e) => setName(e.target.value)}
        />
        {name ? (
          <div
            class="z-10 absolute left-10 mt-12 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div class="py-1" role="none">
              {filterData.map((val) => {
                return (
                  <p
                    className="transition duration-200 font-semibold block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                    onClick={() => addBtn(val)}
                  >
                    {val.product_name}
                  </p>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  const cardCustom = () => {
    return container.map((val, index) => {
      return (
        <CardCustomOrder
          name={val.product_name}
          stock={val.product_stock_total}
          qty={val.qty}
          image={val.product_image_path}
          addBtn={() => addQty(index)}
          decBtn={() => decQty(index)}
        />
      );
    });
  };
  return (
    <div className="grid grid-cols-3 gap-4 my-5 h-screen mx-5">
      <div className="col-span-2">
        <div className="flex flex-col">
          <h3 className="flex text-gray-700 font-semibold text-2xl mx-5">
            <svg
              className="h-7 w-7 mt-1 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Create your own custom prescription
          </h3>
          <div className="w-96 mt-5 ml-5">{searchComponent()}</div>
          <div className="mx-5 mt-3 space-y-3 flex flex-wrap">
            {cardCustom()}
          </div>
        </div>
      </div>
      <div className="border-2">Two</div>
    </div>
  );
};

export default CustomOrder;
