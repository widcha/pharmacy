const { Op } = require("sequelize");
const { Custom_Order } = require("../models");
module.exports = {
	addSumn: async (req, res) => {
		try {
			const { custom_product_uid, product_id, product_qty } = req.body;
			// const l  = [ 1,2]
			// let response;
			// for (let i = 0; i <= 2; i++) {
			// const custom_product_uid = Date.now();
			const response = await Custom_Order.create({
				custom_product_uid,
				product_id,
				product_qty,
			});
			// }

			// const response = await Custom_Order.findAll();
			return res.send(response);
		} catch (err) {
			return res.status(404).send(err.message);
		}
	},
};
