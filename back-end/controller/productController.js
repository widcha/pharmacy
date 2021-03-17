const {Product} = require('../models');
const fs = require("fs");
const pify = require("pify");
const { uploader } = require('../handlers');
const { parse } = require('path');

module.exports = {
    getAllProduct: async (req,res) => {
        try {
            const response = await Product.findAll();
            return res.status(200).send(response);
        } catch (err) {
            return res.send(err.message);
        }
    },
    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await Product.findOne({
                where: {
                    product_id: id,
                }
            });
            return res.status(200).send(response.dataValues);
        } catch (err) {
            return res.send(err.message);
        }
    },
    getProductbyCategory: async (req, res) => {
        try {
            const {id} = req.params;
            const response = await Product.findAll({
                where: {
                    product_category_id: id,
                }
            });
            return res.status(200).send(response);
        } catch (err) {
            return res.send(err.message);
        }
    },
    addNewProduct: async (req,res) => {
        try {
            const path = "/product";
            const upload = pify(uploader(path, "PRD").fields([{ name: 'image' }]));

            upload(req, res, async (err) => {
                const {image} = req.files;
                const {
                    newName,
                    newPrice,
                    newVol,
                    newDesc,
                    selectedCategory,
                    stock
                } = JSON.parse(req.body.data);
                const imagepath = image ? `${path}/${image[0].filename}` : null;

                const stock_total = parseInt(newVol) * parseInt(stock);
                const response = await Product.create({
                    product_name: newName,
                    product_price: parseInt(newPrice),
                    product_stock: parseInt(stock),
                    product_vol: parseInt(newVol),
                    product_stock_total: stock_total,
                    product_desc: newDesc,
                    product_category_id: selectedCategory,
                    product_image_path: imagepath,
                });
                if (response){
                    return res.status(201).send(response);
                } else {
                    fs.unlinkSync(`public${imagepath}`);
                    return res.status(500).send(err.message);
                }
            })
        } catch (err) {
            return res.send(err.message);
        }
    },
    addProductStock: async (req, res) => {
        try {
            const {id} = req.params;
            const { product_stock } = req.body;
            const products = await Product.findOne({
                where: {
                    product_id: id,
                }
            });
            const old_stock = parseInt(products.dataValues.product_stock);
            const newStock = (old_stock+ parseInt(product_stock));
            const stock_total = parseInt(products.dataValues.product_vol)*parseInt(newStock);
            
            await Product.update({ 
                product_stock: parseInt(newStock), 
                product_stock_total: parseInt(stock_total) 
            }, { 
                where: { 
                    product_id: id,
                }
            });
            return res.status(200).send({
                message: 'Stock updated successfully'
            })
        } catch (err) {
            return res.send(err.message);
        }
    },
    editProduct: async (req,res) => {
        try {
            const { id } = req.params;

            const path = "/product";
            const upload = pify(uploader(path, "PRD").fields([{ name: 'image' }]));
            
            const prods = await Product.findOne({
                where: {
                    product_id: id,
                }
            });
            const oldImagepath = prods.dataValues.product_image_path;
            
            upload(req, res, async (err) => {
                const { image } = req.files;
                const {
                    newName,
                    newPrice,
                    newVol,
                    newDesc,
                    selectedCategory
                } = JSON.parse(req.body.data);
                const stock_total = parseInt(prods.dataValues.product_stock)*parseInt(newVol);

                const imagePath = image ? `${path}/${image[0].filename}` : oldImagepath;

                const response = await Product.update({
                    product_name: newName,
                    product_price: parseInt(newPrice),
                    product_vol: parseInt(newVol),
                    product_stock_total: parseInt(stock_total),
                    product_desc: newDesc,
                    product_category_id: parseInt(selectedCategory),
                    product_image_path: imagePath,
                }, {
                    where: {
                        product_id: id,
                    }
                });

                if(response){
                    if(image && oldImagepath!== null){
                        fs.unlinkSync(`public${oldImagepath}`);
                    }
                }else{
                    fs.unlinkSync(`public${imagePath}`);
                }
            })
            return res.status(200).send({ message: 'Product updated' });
        } catch (err) {
            return res.send(err.message);
        }
    },
    deleteProduct: async (req,res) => {
        try {
            const { id } = req.params;
            const prods = await Product.findOne({
                where: {
                    product_id: id,
                }
            });
            console.log(prods.dataValues.product_image_path);
            const oldImagepath = prods.dataValues.product_image_path;
            if(oldImagepath){
                fs.unlinkSync(`public${oldImagepath}`)
                await Product.destroy({
                    where: {
                        product_id: id,
                    }
                });
            }
            console.log("deleted");
            return res.status(200).send({ message: 'Product deleted' });
        } catch (err) {
            return res.send(err.message);
        }
    }
}