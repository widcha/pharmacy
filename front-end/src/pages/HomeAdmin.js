import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DashboardModal from "../components/DashboardModal";
import {getFinancialReports, getItemLength} from "../redux/actions";
import {Link} from "react-router-dom";

const HomeAdmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemLength());
    dispatch(getFinancialReports());
  }, [dispatch]);
  const {
    lengths,
    finance_report,
    totalEarning,
    data,
    product_sold,
  } = useSelector((state) => state.admin);

  const [showModal, setShowModal] = useState(false);
  const toggle = () => {
    setShowModal(!showModal);
  };
  const headerDashboard = () => {
    return (
      <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <DashboardModal
          toggle={toggle}
          openmodal={showModal}
          data={product_sold ? product_sold : null}
        />
        {/* <!-- Card --> */}
        <Link to="/">
          <div class="flex items-center p-4 bg-gray-700 rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-orange-700 bg-orange-300 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-100 dark:text-gray-400">
                Active users
              </p>
              <p class="text-lg font-semibold text-gray-100 dark:text-gray-200">
                {lengths.users}
              </p>
            </div>
          </div>
        </Link>
        {/* <!-- Card --> */}
        <div class="flex items-center p-4 bg-gray-700 rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-green-700 bg-green-300 rounded-full dark:text-green-100 dark:bg-green-500">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-100 dark:text-gray-400">
              Account balance
            </p>
            <p class="text-lg font-semibold text-gray-100 dark:text-gray-200">
              Rp{" "}
              {totalEarning
                ? parseInt(totalEarning[0].totalEarning).toLocaleString()
                : null}
            </p>
          </div>
        </div>
        {/* <!-- Card --> */}
        <div class="flex items-center p-4 bg-gray-700 rounded-lg shadow-xs dark:bg-gray-800">
          <div class="p-3 mr-4 text-blue-700 bg-blue-300 rounded-full dark:text-blue-100 dark:bg-blue-500">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-100 dark:text-gray-400">
              All sales
            </p>
            <p class="text-lg font-semibold text-gray-100 dark:text-gray-200">
              {lengths.success_trans}
            </p>
          </div>
        </div>
        {/* <!-- DATA PRODUK TERLARIS --> */}
        <div onClick={toggle}>
          <div class="flex items-center p-4 bg-gray-700 rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-teal-700 bg-teal-300 rounded-full dark:text-teal-100 dark:bg-teal-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-100 dark:text-gray-400">
                Best Seller Products (Click Me!)
              </p>
              <p class="text-lg font-semibold text-gray-100 dark:text-gray-200">
                Products {lengths.products}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const tableAdmin = () => {
    return (
      <div>
        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
          <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
              <thead>
                <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th class="px-4 py-3">Client</th>
                  <th class="px-4 py-3">Amount</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {finance_report
                  ? finance_report.map((val, index) => {
                      return (
                        <tr class="text-gray-700 dark:text-gray-400">
                          <td class="px-4 py-3">
                            <div class="flex items-center text-sm">
                              <div>
                                <p class="font-semibold">
                                  {data ? data[index].User.user_username : null}
                                </p>
                                <p class="text-xs text-gray-600 dark:text-gray-400">
                                  {val.transaction_invoice_number}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="px-4 py-3 text-sm">
                            Rp {val.finance_earning.toLocaleString()}
                          </td>
                          <td class="px-4 py-3 text-xs">
                            {data ? (
                              data[index].User.is_banned === 0 ? (
                                <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                  Active
                                </span>
                              ) : (
                                <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                                  Denied
                                </span>
                              )
                            ) : null}
                          </td>
                          <td class="px-4 py-3 text-sm">
                            {val.createdAt.split("T")[0]}
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="mt-5">
      <div className="flex ml-20">{headerDashboard()}</div>
      <div className="ml-20">{tableAdmin()}</div>
    </div>
  );
};

export default HomeAdmin;
