const { Op } = require("sequelize");
const { Custom_Product } = require("../models");
module.exports = {
	addSumn: async (req, res) => {
		try {
			const { custom_product_price, product_qty } = req.body;
			// const l  = [ 1,2]
			// let response;
			// for (let i = 0; i <= 2; i++) {
			// const custom_product_uid = Date.now();
			const response = await Custom_Product.create({
				product_qty,
				custom_product_price,
			});
			// }

			// const response = await Custom_Order.findAll();
			return res.send(response);
		} catch (err) {
			return res.status(404).send(err.message);
		}
	},
};
