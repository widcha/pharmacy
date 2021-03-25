const { response } = require("express");
const { Op } = require("sequelize");
const {
	Custom_Product,
	Transaction,
	Product,
	sequelize,
} = require("../models");
module.exports = {
	fetchUserTransactionDetail: async (req, res) => {
		try {
			const { user_id } = req.query;

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
				],
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
			let response5 = await Transaction.findAll({
				where: {
					transaction_invoice_number: {
						[Op.in]: response4.map((val) => {
							return val.transaction_invoice_number;
						}),
					},
				},
				include: [
					{ model: Product },
					{ model: Custom_Product },
					// attributes:['']
				],
			});
			console.log(response4);
			// let arr = []
			const arr = response4.map((val) => {
				return {
					...val,
					data: response5.filter((subVal) => {
						// console.log(subVal.product_id);
						return (
							subVal.transaction_invoice_number ===
							val.transaction_invoice_number
						);
						// return { product: subVal.product_id };
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
