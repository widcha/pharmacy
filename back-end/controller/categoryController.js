const { Product_Category } = require('../models');

module.exports = {
    getCategory: async (req,res) => {
        try {
            const response = await Product_Category.findAll()
            return res.status(200).send(response);
        } catch (err) {
            return res.send(err.message);
        }
    },
    addNewCategory: async (req, res) => {
        try {
            const { category_name } = req.body;
            const response = await Product_Category.create({
                product_category: category_name,
            });
            return res.status(200).send(response);
        } catch (err) {
            return res.send(err.message)
        }
    },
    editCategory: async (req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await Product_Category.update({ product_category: name }, { 
                where: { 
                    product_category_id: id
                }
            });
            return res.status(200).send({ message: 'Category updated' });
        } catch (err) {
            return res.send(err.message);
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;
            await Product_Category.destroy({
                where: {
                    product_category_id: id
                }
            })
            return res.status(200).send({ message: 'Category deleted'});
        } catch (err) {
            return res.send(err.message);
        }
    },
};