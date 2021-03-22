const {Material_Flow, Product, Product_Category} = require("../models");
const fs = require("fs");
const pify = require("pify");
const {uploader} = require("../handlers");
const {Op} = require("sequelize");
const sequelize = require("sequelize");
const e = require("express");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      const {minPrice, maxPrice, search, sortChosen} = req.query;
      let orderSort;
      if (sortChosen) {
        if (sortChosen === "DateOld") {
          orderSort = [["createdAt", "ASC"]];
        } else if (sortChosen === "DateNew") {
          orderSort = [["createdAt", "DESC"]];
        }
      }

      let response;
      if (
        maxPrice === undefined ||
        maxPrice === 0 ||
        maxPrice === null ||
        maxPrice === "" ||
        maxPrice === "false"
      ) {
        //KALAU MAXPRICE TIDAK ADA
        response = await Product.findAll({
          where: {
            [Op.and]: {
              product_price: {[Op.gte]: minPrice ? minPrice : 0},
              product_name: {[Op.substring]: `${search ? search : ""}`},
            },
          },
          order: orderSort,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: Product_Category,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
        });
      } else {
        //KALAU ADA MAX PRICE
        if (minPrice || search) {
          response = await Product.findAll({
            where: {
              [Op.and]: {
                product_price: {
                  [Op.and]: {
                    [Op.gte]: minPrice ? minPrice : 0,
                    [Op.lte]: maxPrice,
                  },
                },
                product_name: {[Op.substring]: `${search ? search : ""}`},
              },
            },
            order: orderSort,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Product_Category,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          });
        }
      }
      return res.status(200).send(response);
    } catch (err) {
      return res.send(err.message);
    }
  },
  getProductById: async (req, res) => {
    try {
      const {id} = req.params;
      const response = await Product.findOne({
        where: {
          product_id: id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Product_Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });
      return res.status(200).send(response);
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
        },
      });
      return res.status(200).send(response);
    } catch (err) {
      return res.send(err.message);
    }
  },
  addNewProduct: async (req, res) => {
    try {
      const path = "/product";
      const upload = pify(uploader(path, "PRD").fields([{name: "image"}]));

      upload(req, res, async (err) => {
        const {image} = req.files;
        const {
          newName,
          newPrice,
          newVol,
          newDesc,
          selectedCategory,
          newStock,
        } = JSON.parse(req.body.data);
        const imagepath = image ? `${path}/${image[0].filename}` : null;

        const stock_total = parseInt(newVol) * parseInt(newStock);
        const response = await Product.create({
          product_name: newName,
          product_price: parseInt(newPrice),
          product_stock: parseInt(newStock),
          product_vol: parseInt(newVol),
          product_stock_total: stock_total,
          product_desc: newDesc,
          product_category_id: selectedCategory,
          product_image_path: imagepath,
        });

        if (response) {
          Material_Flow.create({
            product_id: response.dataValues.product_id,
            material_flow_stock: newStock,
            material_flow_info: "Stock added by admin - new Product",
            stock: newStock,
          });
          return res.status(201).send(response);
        } else {
          fs.unlinkSync(`public${imagepath}`);
          return res.status(500).send(err.message);
        }
      });
    } catch (err) {
      return res.send(err.message);
    }
  },
  addProductStock: async (req, res) => {
    try {
      const {id} = req.params;
      const {product_stock} = req.body;
      const products = await Product.findOne({
        where: {
          product_id: id,
        },
      });
      const old_stock = parseInt(products.dataValues.product_stock);
      const newStock = old_stock + parseInt(product_stock);
      const stock_total =
        parseInt(products.dataValues.product_vol) * parseInt(newStock);

      await Product.update(
        {
          product_stock: parseInt(newStock),
          product_stock_total: parseInt(stock_total),
        },
        {
          where: {
            product_id: id,
          },
        }
      );

      //MATERIAL FLOW WHEN ADMIN ADD NEW STOCK
      if (product_stock !== 0) {
        await Material_Flow.create({
          product_id: id,
          material_flow_stock: product_stock,
          material_flow_info: "Stock added by admin",
          stock: newStock,
        });
      }
      return res.status(200).send({
        message: "Stock updated successfully",
      });
    } catch (err) {
      return res.send(err.message);
    }
  },
  editProduct: async (req, res) => {
    try {
      const {id} = req.params;

      const path = "/product";
      const upload = pify(uploader(path, "PRD").fields([{name: "image"}]));

      const prods = await Product.findOne({
        where: {
          product_id: id,
        },
      });
      const oldImagepath = prods.dataValues.product_image_path;

      upload(req, res, async (err) => {
        const {image} = req.files;
        const {
          newName,
          newPrice,
          newVol,
          oldStock,
          newDesc,
          selectedCategory,
        } = JSON.parse(req.body.data);
        const stock_total = parseInt(oldStock) * parseInt(newVol);

        const imagePath = image ? `${path}/${image[0].filename}` : oldImagepath;

        const response = await Product.update(
          {
            product_name: newName,
            product_price: parseInt(newPrice),
            product_vol: parseInt(newVol),
            product_stock: parseInt(oldStock),
            product_stock_total: parseInt(stock_total),
            product_desc: newDesc,
            product_category_id: parseInt(selectedCategory),
            product_image_path: imagePath,
          },
          {
            where: {
              product_id: id,
            },
          }
        );

        //MATERIAL FLOW WHEN ADMIN CAN CHANGE DATA
        const stockk = prods.dataValues.product_stock;
        let info = "";
        let stockChanged = stockk - oldStock;
        if (stockk > oldStock) {
          info = "Stock decreased by admin";
        } else if (stockk < oldStock) {
          info = "Stock added by admin";
        }

        if (stockChanged !== 0) {
          await Material_Flow.create({
            product_id: id,
            material_flow_stock: `${-stockChanged}`,
            material_flow_info: `${info}`,
            stock: oldStock,
          });
        }
        if (response) {
          if (image && oldImagepath !== null) {
            fs.unlinkSync(`public${oldImagepath}`);
          }
        } else {
          fs.unlinkSync(`public${imagePath}`);
        }
      });
      return res.status(200).send({message: "Product updated"});
    } catch (err) {
      return res.send(err.message);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const {id} = req.params;
      const prods = await Product.findOne({
        where: {
          product_id: id,
        },
      });
      const oldImagepath = prods.dataValues.product_image_path;
      if (oldImagepath) {
        fs.unlinkSync(`public${oldImagepath}`);
        await Product.destroy({
          where: {
            product_id: id,
          },
        });
      }
      return res.status(200).send({message: "Product deleted"});
    } catch (err) {
      return res.send(err.message);
    }
  },
  sortProduct: async (req, res) => {
    try {
      const {order, id} = req.query;
      if (id) {
        const sort_res = await Product.findAll({
          order: [["createdAt", `${order}`]],
          where: {
            product_category_id: id,
          },
        });
        return res.send(sort_res);
      } else {
        const sort_res = await Product.findAll({
          order: [["createdAt", `${order}`]],
        });
        return res.send(sort_res);
      }
    } catch (err) {
      return res.send(err.message);
    }
  },
  getProductCategories: async (req, res) => {
    try {
      const {category} = req.query;
      if (category > 0) {
        const response = await Product.findAll({
          where: {
            product_category_id: {
              [Op.eq]: category,
            },
          },
        });
        return res.send(response);
      } else {
        const cat_response = await Product_Category.findAll();
        return res.send(cat_response);
      }
    } catch (err) {
      return res.send(err.message);
    }
  },
  searchProduct: async (req, res) => {
    try {
      const {search, limit} = req.query;
      let response = await Product.findAll({
        where: {
          product_name: {
            [Op.substring]: search,
          },
        },
      });
      return res.status(200).send(response);
    } catch (err) {
      return res.send(err.message);
    }
  },
  getAllProductbyUser: async (req, res) => {
    try {
      const {highest_price, price_from, price_to, category} = req.query;
      console.log("halo");
      if (highest_price === "true") {
        const response = await Product.findAll({
          attributes: [
            [sequelize.fn("max", sequelize.col("product_price")), "maxPrice"],
          ],
          raw: true,
        });
        return res.status(200).send(response);
      } else if (price_from && price_to && category) {
        if (category > 0) {
          const response = await Product.findAll({
            where: {
              [Op.and]: {
                product_price: {
                  [Op.and]: {
                    [Op.gte]: price_from,
                    [Op.lte]: price_to,
                  },
                },
                product_category_id: {
                  [Op.eq]: category,
                },
              },
            },
          });
          return res.status(200).send(response);
        } else {
          const response = await Product.findAll({
            where: {
              product_price: {
                [Op.and]: {
                  [Op.gte]: price_from,
                  [Op.lte]: price_to,
                },
              },
            },
          });
          return res.status(200).send(response);
        }
      } else {
        const response = await Product.findAll({
          order: [["createdAt", "DESC"]],
        });
        return res.status(200).send(response);
      }
    } catch (err) {
      return res.send(err.message);
    }
  },
};
