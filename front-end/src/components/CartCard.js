import React from "react";
import { Link } from "react-router-dom";
import customImg from "../assets/icons/pill2.png";
export const CartCard = ({
	total,
	image,
	name,
	user_id,
	product_id,
	qty,
	price,
	stock,
	increment,
	decrement,
	vol,
	del,
	totalCustom,
	data,
	custom_product_id,
}) => {
	if (data) {
		let condition = false;
		const renderItems = () => {
			return data.map((val) => {
				// return <div>{val.Product.product_name}</div>;
				return (
					<div className="flex ml-2">
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
								{val.product_qty} gram(s) of {val.Product.product_name}
							</span>
						</p>
					</div>
				);
			});
		};
		data.forEach((items) => {
			if (items.product_qty > items.Product.product_stock_total) {
				condition = true;
			}
		});
		return (
			<div className=" w-full flex flex-grow-0 resize-none container flex-row my-2 justify-between">
				{condition ? (
					<label className="absolute ml-96 mt-8 text-7xl text-black">
						out of stock
					</label>
				) : null}

				<div
					className={
						condition
							? "w-11/12 flex flex-grow-0 resize-none opacity-40"
							: "w-11/12 flex flex-grow-0 resize-none"
					}
				>
					<div className="w-full bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg ">
						<div id="header" className="flex w">
							<img
								alt="mountain"
								className="w-36 p-2 rounded-md border-2 border-gray-300 flex-grow-0 resize-none"
								src={customImg}
							/>
							<div id="body" className="flex  ml-5 justify-between w-1/12">
								<h4 id="name" className="text-xl font-semibold">
									Custom Product
								</h4>
							</div>
							<div className="flex  w-6/12 flex-wrap">{renderItems()}</div>
							<div className="flex justify-center content-center items-center p-auto">
								<label className="text-3xl">
									Total Price: Rp.{totalCustom.toLocaleString()}
								</label>
							</div>
						</div>
					</div>
				</div>
				<button
					className="outline-none focus:outline-none cursor-default"
					onClick={() => del(user_id, custom_product_id)}
				>
					<svg
						class="w-16 h-16 hover:bg-gray-300 rounded transition duration-200 cursor-pointer"
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
				{/* <button className="outline-none focus:outline-none cursor-default">
			<svg
				class="w-16 h-16 hover:bg-gray-300 rounded transition duration-200 cursor-pointer"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				onClick={() => del(user_id, product_id)}
			>
				<path
					fill-rule="evenodd"
					d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
					clip-rule="evenodd"
				></path>
			</svg>
		</button> */}
			</div>
		);
	}
	return (
		<div className=" w-full flex container flex-row my-2 justify-between">
			{qty <= stock ? null : (
				<label className="absolute ml-96 mt-12 text-7xl text-black">
					out of stock
				</label>
			)}

			<div className={qty <= stock ? "w-11/12" : "opacity-40 w-11/12"}>
				<div className="w-full bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg">
					<div id="header" className="flex">
						<Link to={`/product/detail?id=${product_id}`}>
							<img
								alt="mountain"
								className="w-36 p-2 rounded-md border-2 border-gray-300"
								src={`http://localhost:5000${image}`}
							/>
						</Link>
						<div id="body" className="flex flex-col ml-5 justify-between">
							<h4 id="name" className="text-xl font-semibold">
								{name}
							</h4>
							<span
								className="
						text-sm"
							>
								({vol}ml left)
							</span>

							<p className="text-lg font-bold">
								Rp{price.toLocaleString()}/gram
							</p>

							<div class="w-28 flex justify-center ">
								<button
									onClick={() => decrement(product_id, qty)}
									disabled={qty === 1}
								>
									<svg
										class="w-6 h-6 fill-current text-gray-600 "
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clip-rule="evenodd"
										></path>
									</svg>
								</button>
								<input
									value={qty}
									className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
									disabled
								/>
								<button
									onClick={() => increment(product_id, qty, price)}
									disabled={qty === stock}
								>
									<svg
										class="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fill-rule="evenodd"
											d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
											clip-rule="evenodd"
										></path>
									</svg>
								</button>
							</div>
						</div>
						<div className="flex justify-center content-center items-center pl-52">
							<label className="text-3xl">
								Total Price: Rp.{total.toLocaleString()}
							</label>
						</div>
					</div>
				</div>
			</div>
			<button className="outline-none focus:outline-none cursor-default">
				<svg
					class="w-16 h-16 hover:bg-gray-300 rounded transition duration-200 cursor-pointer"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					onClick={() => del(user_id, product_id)}
				>
					<path
						fill-rule="evenodd"
						d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
						clip-rule="evenodd"
					></path>
				</svg>
			</button>
		</div>
	);
};
