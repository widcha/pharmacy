import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { CartCard } from "../components/CartCard";
import {
  fetchUserCartByIdAction,
  redirectToCheckoutAction,
  userAddProductToCartAction,
  userCheckoutAction,
  userDeleteCustomProductInCart,
  userDeleteProductInCart,
  userGetSubTotal,
  userSubProductFromCartAction,
} from "../redux/actions";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
export const Cart = () => {
  const dispatch = useDispatch();
  const { cart_list, available_products, subTotal, tax, total } = useSelector(
    (state) => state.cart
  );
  const { user_id } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserCartByIdAction(user_id));
    dispatch(userGetSubTotal(user_id));
  }, [dispatch, user_id]);
  const handleIncrement = debounce((idx, qty, price) => {
    dispatch(
      userAddProductToCartAction(
        {
          user_id,
          product_id: idx,
          product_qty: 1,
          product_price: price,
        },
        "cart"
      )
    );
  }, 200);

  const handleDecrement = debounce((idx, currQty) => {
    dispatch(
      userSubProductFromCartAction({ user_id, product_id: idx, currQty })
    );
  }, 200);

  // setTimeout(() => {

  // }, 500);

  const handleDelete = (user_id, product_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userDeleteProductInCart(user_id, product_id));
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const handleDeleteCustom = (user_id, custom_product_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userDeleteCustomProductInCart(user_id, custom_product_id));
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const renderCart = () => {
    return cart_list.map((val, index) => {
      if (val.custom_product_id === null) {
        // let price = val.product_price / val.Product.product_vol;
        let total = val.product_price * val.product_qty;
        return (
          <CartCard
            total={Math.ceil(total)}
            image={val.Product.product_image_path}
            name={val.Product.product_name}
            user_id={val.user_id}
            product_id={val.product_id}
            qty={val.product_qty}
            price={Math.ceil(val.product_price)}
            stock={val.Product.product_stock_total}
            vol={val.Product.product_stock_total}
            increment={handleIncrement}
            decrement={handleDecrement}
            del={handleDelete}
          />
        );
      } else {
        let total = val.custom_product_qty * val.custom_product_price;
        return (
          <CartCard
            totalCustom={Math.ceil(total)}
            data={val.Carts}
            custom_product_id={val.custom_product_id}
            user_id={val.user_id}
            del={handleDeleteCustom}
            // image={val.Product.product_image_path}
            // name={val.Product.product_name}
            // user_id={val.user_id}
            // product_id={val.product_id}
            // qty={val.product_qty}
            // price={Math.ceil(price)}
            // stock={val.Product.product_stock_total}
            // vol={val.Product.product_stock_total}
            // increment={handleIncrement}
            // decrement={handleDecrement}
            // del={handleDelete}
          />
        );
      }
    });
  };

  const handleCheckout = () => {
    dispatch(redirectToCheckoutAction());
  };
  if (cart_list.length === 0) {
    return (
      <div className="flex h-screen">
        <div className="m-auto flex flex-col items-center">
          <svg
            class="w-44 h-44"
            fill="#00b3ac"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
          </svg>
          <p className="text-3xl font-bold font-sans text-gray-800">
            Your Cart is Empty
          </p>
          <p className="text-3xl font-bold font-sans text-gray-800">
            Add something to make me happy :)
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center my-6">
      <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
        <label className="text-xl font-bold border-gray-400 border-b-2 mb-3">
          YOUR CART
        </label>

        <div className="flex-1">
          {renderCart()}
          <div className="pb-6 mt-6">
            <div className="my-4 mt-6 -mx-2 lg:flex">
              <div className="lg:px-2 lg:w-1/2">
                <div className="p-4 bg-gray-100 rounded-full">
                  <h1 className="ml-2 font-bold uppercase">Address</h1>
                </div>
                <div className="p-4">
                  <p className="mb-4 italic">
                    If you have a coupon code, please enter it in the box below
                  </p>
                  <div className="justify-center md:flex">
                    <form action="" method="POST">
                      <div className="flex items-center w-full h-13 pl-3  bg-gray-100 border rounded-full">
                        <input
                          type="coupon"
                          name="code"
                          id="coupon"
                          placeholder="Apply coupon"
                          value="90off"
                          className="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none"
                        />
                        <button
                          type="submit"
                          className="text-sm flex items-center px-3 py-1 text-white bg-gray-800 rounded-full outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none"
                        >
                          <svg
                            aria-hidden="true"
                            data-prefix="fas"
                            data-icon="gift"
                            className="w-8"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"
                            />
                          </svg>
                          <span className="font-medium">Apply coupon</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="p-4 mt-6 bg-gray-100 rounded-full">
                  <h1 className="ml-2 font-bold uppercase">
                    Instruction for seller
                  </h1>
                </div>
                <div className="p-4">
                  <p className="mb-4 italic">
                    If you have some information for the seller you can leave
                    them in the box below
                  </p>
                  <textarea className="w-full h-24 p-2 bg-gray-100 rounded"></textarea>
                </div>
              </div>
              <div className="lg:px-2 lg:w-1/2">
                <div className="p-4 bg-gray-100 rounded-full">
                  <h1 className="ml-2 font-bold uppercase">Order Details</h1>
                </div>
                <div className="p-4">
                  <p className="mb-6 italic">
                    Shipping and additionnal costs are calculated based on
                    values you have entered
                  </p>
                  <div className="flex justify-between border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Subtotal
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      Rp.{subTotal.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Tax 10%
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      Rp. {tax.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Total
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      Rp. {total.toLocaleString()}
                    </div>
                  </div>
                  <Link to="/user/payment/checkout">
                    <button
                      className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                      onClick={handleCheckout}
                    >
                      <svg
                        aria-hidden="true"
                        data-prefix="far"
                        data-icon="credit-card"
                        className="w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                        />
                      </svg>
                      <span className="ml-2 mt-5px">Procceed to checkout</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
