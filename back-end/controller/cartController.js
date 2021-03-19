const { Op } = require("sequelize");

const { Cart, Product } = require("../models");
module.exports = {
	userAddProductToCart: async (req, res) => {
		try {
			const { user_id, product_id, product_qty, product_price } = req.body;
			const cart_check = await Cart.findAll({
				where: {
					[Op.and]: {
						user_id: user_id,
						product_id: product_id,
					},
				},
			});
			if (cart_check.length > 0) {
				await Cart.update(
					{ product_qty: cart_check[0].product_qty + product_qty },
					{
						where: {
							[Op.and]: {
								user_id: user_id,
								product_id: product_id,
								cart_id: cart_check[0].cart_id,
							},
						},
					}
				);
				// const response = await Cart.findAll({
				// 	where: {
				// 		cart_id: { [Op.eq]: cart_check[0].cart_id },
				// 	},
				// });
				const response = await Cart.findAll({
					where: {
						user_id: {
							[Op.eq]: user_id,
						},
					},
					attributes: { exclude: ["createdAt", "updatedAt"] },
					include: [
						{
							model: Product,
							attributes: {
								exclude: [
									"createdAt",
									"updatedAt",
									"product_desc",
									"product_id",
									"product_price",
									"product_category_id",
								],
							},
						},
					],
				});
				return res.send(response);
			} else {
				await Cart.create({
					user_id,
					product_id,
					product_qty,
					product_price,
				});
				const response = await Cart.findAll({
					where: {
						user_id: {
							[Op.eq]: user_id,
						},
					},
					attributes: { exclude: ["createdAt", "updatedAt"] },
					include: [
						{
							model: Product,
							attributes: {
								exclude: [
									"createdAt",
									"updatedAt",
									"product_desc",
									"product_id",
									"product_price",
									"product_category_id",
								],
							},
						},
					],
				});
				return res.send(response);
			}
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	},
};
