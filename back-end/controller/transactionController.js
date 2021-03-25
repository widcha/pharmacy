const { response } = require("express");
const { Op } = require("sequelize");
const {
	Custom_Product,
	Transaction,
	Product,
	sequelize,
	Order_Status,
} = require("../models");
module.exports = {
	fetchUserTransactionDetail: async (req, res) => {
		try {
			const { user_id } = req.query;
			// * iniiiiiiiiiiiiiiiii buat ambil transaction invoice dan totalnya
			const response4 = await Transaction.findAll({
				where: {
					user_id,
					// transaction_invoice_number: {
					// 	[Op.in]: ["INV/22/1616602160703", "INV/22/1616645035694"],
					// },
				},
				raw: true,
				group: ["transaction_invoice_number"],
				attributes: [
					"transaction_invoice_number",
					"transaction_payment_details",
					"transaction_date",
					"order_status_id",
					"payment_method_id",
					"user_address",
				],
				include: [
					{
						model: Order_Status,
						attributes: {
							exclude: ["createdAt", "updatedAt", "order_status_id"],
						},
					},
				],
			});
			//* inii buat ambil custom prodcut idnya doang
			const responseCustom = await Transaction.findAll({
				where: {
					[Op.and]: {
						user_id,
						custom_product_id: {
							[Op.ne]: null,
						},
					},

					// transaction_invoice_number: {
					// 	[Op.in]: ["INV/22/1616602160703", "INV/22/1616645035694"],
					// },
				},
				raw: true,
				group: ["custom_product_id"],
				attributes: ["custom_product_id", "transaction_invoice_number"],
			});
			// let response5 = [];

			// response4.forEach(async (val) => {
			// 	const data = await Transaction.findAll({
			// 		where: {
			// 			transaction_invoice_number: val.transaction_invoice_number,
			// 		},
			// 	});
			// 	return response5.push(data);
			// });
			// console.log(response4);

			//* ini buat ambil semua transaction by invoice number
			let response5 = await Transaction.findAll({
				where: {
					transaction_invoice_number: {
						[Op.in]: response4.map((val) => {
							return val.transaction_invoice_number;
						}),
					},
				},
				// attributes: ["product_name", "product_qty", "product_id"],
				attributes: {
					exclude: [
						"createdAt",
						"updatedAt",
						"transaction_pharmacist_notes",
						"transaction_date",
						"transaction_payment_details",
						"user_address",
					],
				},
				include: [
					{
						model: Product,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
				],
			});
			// let arr = []
			// * ini buat ambil custom product yg ada di transaction tp dipisahin gitu
			const customres = await Custom_Product.findAll({
				where: {
					user_id,
					is_checkout: 1,
					custom_product_id: responseCustom.map((items) => {
						return items.custom_product_id;
					}),
				},
				include: [
					{
						model: Transaction,
						attributes: [
							"transaction_invoice_number",
							"product_name",
							"product_qty",
						],
					},
				],
				attributes: [
					"custom_product_price",
					"custom_product_qty",
					"notes",
					"custom_product_id",
				],
			});

			// * ini yg dikirim
			const arr = response4.map((val) => {
				return {
					...val,
					data: response5.filter((subVal) => {
						// console.log(subVal.product_id);
						return (
							subVal.transaction_invoice_number ===
								val.transaction_invoice_number &&
							subVal.custom_product_id === null
						);
						// return { product: subVal.product_id };
					}),
					custom_data: customres.filter((customs, i) => {
						return (
							customs.Transactions[0].transaction_invoice_number ===
							val.transaction_invoice_number
						);
					}),
				};
			});
			// console.log(arr);
			// console.log(response5);

			// const response5 = response4.map(async (val) => {
			// 	const data = await Transaction.findAll({
			// 		where: {
			// 			user_id,
			// 		},
			// 		raw: true,
			// 	});
			// 	// console.log(object);

			// 	return data;
			// });

			// response4.forEach(async (val) => {
			// 	const data = await Transaction.findAll({
			// 		where: {
			// 			[Op.and]: {
			// 				user_id,
			// 				transaction_invoice_number: val.transaction_invoice_number,
			// 			},
			// 		},
			// 		raw: true,
			// 		attributes: { exclude: ["createdAt", "updatedAt"] },
			// 		// having: {
			// 		// 	transaction_invoice_number: val.transaction_invoice_number,
			// 		// },
			// 		include: [
			// 			{
			// 				model: Custom_Product,
			// 				attributes: { exclude: ["createdAt", "updatedAt"] },
			// 			},
			// 		],
			// 	});
			// 	response5.push({
			// 		transaction_invoice_number: val.transaction_invoice_number,
			// 		transaction_payment_details: val.transaction_payment_details,
			// 		data,
			// 	});
			// });
			// await Transaction.findAll({
			// 	where: {
			// 		user_id,
			// 	},
			// });
			// console.log(response5);

			return res.send(arr);
		} catch (err) {
			return res.status(500).send(err.message);
		}
	},
};
