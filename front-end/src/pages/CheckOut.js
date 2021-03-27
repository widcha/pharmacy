import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import bca from "../assets/icons/bca.svg";
import bni from "../assets/icons/bni.svg";
import bri from "../assets/icons/bri.svg";
import mandiri from "../assets/icons/mandiri.svg";
import { userCheckoutAction } from "../redux/actions";

export const CheckOut = () => {
	const dispatch = useDispatch();
	const [selectedAddress, setSelectedAddress] = useState("");
	const { user_address, user_username, user_id } = useSelector(
		(state) => state.user
	);
	const { available_products } = useSelector((state) => state.cart);
	const { subTotal, tax, total, checkout_ready } = useSelector(
		(state) => state.cart
	);
	const renderAddresses = () => {
		return user_address.map((x) => {
			return (
				<div class="container w-72 flex flex-col space-y-4 justify-center items-center mr-2 focus:outline-black">
					<div class="bg-white w-full flex items-center p-2 rounded-xl shadow border">
						<div class="flex items-center space-x-4"></div>
						<input
							type="radio"
							className="form-radio h-5 w-5 text-gray-600"
							name="address"
							onClick={() => setSelectedAddress(x.user_address)}
							required
						/>
						<div class="flex-grow p-3">
							<div class="font-semibold text-gray-700">{x.user_address}</div>
							<div class="text-sm text-gray-500">To: {user_username}</div>
						</div>
					</div>
				</div>
			);
		});
	};

	const handleCheckout = (e) => {
		e.preventDefault();
		dispatch(
			userCheckoutAction(user_id, available_products, total, selectedAddress)
		);
	};
	if (!checkout_ready) {
		return <Redirect to="/" />;
	}
	if (available_products.length === 0) {
		return <Redirect to="/user/cart" />;
	}
	return (
		<form
			className="flex container m-5 w-auto space-x-2"
			onSubmit={handleCheckout}
		>
			<div className="flex flex-col w-4/5 space-y-2">
				<div className="">
					<div className="font-semibold text-gray-700 rounded-xl shadow border p-10">
						SHIPPING ADDRESS
						<div className="flex flex-wrap">{renderAddresses()}</div>
					</div>
				</div>
				<div>
					<div className="font-semibold text-gray-700  rounded-xl shadow border p-10">
						PAYMENT METHOD
						<div class="bg-white w-full flex items-center p-2 rounded-xl shadow border">
							<div class="flex items-center space-x-4"></div>

							<div class="flex-grow p-3 space-y-3">
								<div class="text-sm text-gray-500">Bank Transfer</div>
								<div className="flex space-x-2">
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											className="form-radio h-5 w-5 text-gray-600"
											name="transfertype"
											value="bca"
											required
										/>
										<img src={bca} className="w-16" />
									</div>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											className="form-radio h-5 w-5 text-gray-600"
											name="transfertype"
											value="bri"
											required
										/>
										<img src={bri} className="w-16" />
									</div>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											className="form-radio h-5 w-5 text-gray-600"
											name="transfertype"
											value="bni"
											required
										/>
										<img src={bni} className="w-16" />
									</div>
									<div className="flex items-center space-x-2">
										<input
											type="radio"
											className="form-radio h-5 w-5 text-gray-600"
											name="transfertype"
											value="mandiri"
											required
										/>
										<img src={mandiri} className="w-16" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="h-auto w-1/5">
				<div className="bg-white flex p-10 rounded-xl shadow border flex flex-col h-96">
					<div className="mt-2  font-semibold text-gray-600">ORDER SUMMARY</div>
					<div className="border-b-2 my-3"></div>
					<div className="flex">
						<div className="w-1/2 text-gray-700 font-mono">
							<div>Subtotal: </div>
							<div>Tax: </div>
							<div class="font-bold text-lg">Total: </div>
						</div>
						<div className="w-1/2 flex flex-col items-end text-gray-700 font-mono">
							<div>Rp. {subTotal}</div>
							<div>Rp. {tax}</div>
							<div class="font-bold text-lg">Rp. {total}</div>
						</div>
					</div>
				</div>
				<button className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
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
					<span className="ml-2 mt-5px">CONFIRM</span>
				</button>
			</div>
		</form>
	);
};
