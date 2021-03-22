import React from "react";

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
}) => {
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
						<img
							alt="mountain"
							className="w-36 p-2 rounded-md border-2 border-gray-300"
							src={`http://localhost:5000${image}`}
						/>
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
			<button onClick={() => del(user_id, product_id)}>
				<svg
					class="w-16 h-16 hover:bg-gray-300 rounded transition duration-200"
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
	);
};
