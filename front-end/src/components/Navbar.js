import { ClickAwayListener } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Logo from "../assets/icons/medicine.svg";
import { api_url } from "../helpers";
import { logoutAction, searchProductAction } from "../redux/actions";
import { CartIcon } from "./CartIcon";

export const Nav = () => {
  const [profile, setProfile] = useState(false);
  const [notif, setNotif] = useState(false);
  const [name, setName] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [suggestion, setSuggestion] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { cart_list } = useSelector((state) => state.cart);

  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const response = await axios.get(
        `${api_url}/product/search?search=${name}`
      );
      const filterData = response.data.filter((val, index) => {
        return (
          val.product_name
            .toLocaleLowerCase()
            .includes(name.toLocaleLowerCase()) && index <= 4
        );
      });
      setFilterData(filterData);
      setSuggestion(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [name]);

  const logoutBtn = () => {
    setProfile(false);
    dispatch(logoutAction());
  };

  const loginBtn = () => {
    return (
      <ul class="flex items-center space-x-5 lg:flex">
        <li>
          <Link to="/login">
            <p
              aria-label="Sign in"
              title="Sign in"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-500"
            >
              Sign in
            </p>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <p
              class="inline-flex items-center justify-center h-9 px-4 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Sign up"
            >
              Sign up
            </p>
          </Link>
        </li>
      </ul>
    );
  };

  const profileBtn = () => {
    return (
      <div class="relative inline-block text-left focus:border-none ">
        <div>
          <button
            onClick={() => setProfile(!profile)}
            type="button"
            class="transition duration-300 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
            id="options-menu"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {user.user_username}
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        {profile ? (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div
              class="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1" role="none">
                <Link to="/user/address">
                  <p
                    className="transition duration-200 font-semibold block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                    role="menuitem"
                  >
                    Account settings
                  </p>
                </Link>
                <p
                  className="transition duration-200 font-semibold block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                  role="menuitem"
                >
                  Transaction
                </p>
                <Link to="/">
                  <p
                    className="transition duration-200 font-semibold block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                    onClick={logoutBtn}
                  >
                    Sign Out
                  </p>
                </Link>
              </div>
            </div>
          </ClickAwayListener>
        ) : null}
      </div>
    );
  };

  const handleClickAway = () => {
    setProfile(false);
    setNotif(false);
    setSuggestion(false);
  };

  const notificationBtn = () => {
    return (
      <div
        className="mr-5 relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
        onClick={() => setNotif(!notif)}
        aria-label="Notifications"
        aria-haspopup="true"
      >
        <button className="pt-2 text-gray-700 cursor-pointer hover:text-gray-400 focus:text-gray-400 transition focus:outline-none duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-7 h-7 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {/* <!-- Notification badge --> */}
          {/* <span
            aria-hidden="true"
            className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
          ></span> */}
        </button>
        {notif ? (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div
              class="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1" role="none">
                <p className="transition duration-200 font-semibold block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                  Notif 1
                </p>
                <p className="transition duration-200 font-semibold block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                  Notif 2
                </p>
                <p className="transition duration-200 font-semibold block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                  Notif 3
                </p>
              </div>
            </div>
          </ClickAwayListener>
        ) : null}
      </div>
    );
  };

  const rightComponent = () => {
    return (
      <div className="flex flex-row items-center">
        <Link to="/user/cart">
          <CartIcon length={cart_list.length} />
        </Link>
        {notificationBtn()}
        {profileBtn()}
      </div>
    );
  };

  const searchBtn = (e) => {
    history.push(`/product?search=${name}`);
    e.preventDefault();
    setSuggestion(false);
  };

  const searchComponent = () => {
    return (
      <form
        className="bg-white shadow flex rounded-xl border border-gray-50 focus:border-transparent"
        onSubmit={searchBtn}
      >
        <input
          className="w-96 rounded-lg focus:outline-none focus:ring-blue-100 focus:ring-4 pl-3 font-semibold text-gray-700 transition duration-300"
          type="text"
          placeholder="Search rulox"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="w-auto flex justify-end items-center text-gray-500 p-1 hover:bg-blue-100 rounded-xl transition duration-300">
          <i
            className="material-icons text-2xl cursor-pointer"
            onClick={searchBtn}
          >
            search
          </i>
        </span>
        {name && suggestion ? (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div
              class="z-10 absolute center mt-12 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1" role="none">
                {filterData.map((val) => {
                  return (
                    <p
                      className="transition duration-200 font-semibold block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                      onClick={searchBtn}
                    >
                      {val.product_name}
                    </p>
                  );
                })}
              </div>
            </div>
          </ClickAwayListener>
        ) : null}
      </form>
    );
  };

  return (
    <div class="px-4 py-2 sm:max-w-xl md:max-w-full md:px-24 lg:px-8 shadow p-4">
      <div class="relative flex items-center justify-between">
        <div class="flex items-center">
          <a
            href="/"
            aria-label="Company"
            title="Company"
            class="inline-flex items-center mr-8"
          >
            <img src={Logo} alt="" className="w-10 h-10" />
            <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Pharma
            </span>
          </a>
          <ul class="flex items-center space-x-8 lg:flex">
            <li>
              <Link to="/product" aria-label="Our product" title="Our product">
                <button
                  class="font-medium tracking-wide text-gray-700 transition-colors duration-300 hover:text-blue-500 focus:outline-none"
                  onClick={() => setName("")}
                >
                  Product
                </button>
              </Link>
            </li>
          </ul>
        </div>
        {searchComponent()}
        {user.user_id === 0 ? loginBtn() : rightComponent()}
      </div>
    </div>
  );
};
