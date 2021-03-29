const {Material_Flow, Product, Product_Category} = require("../models");
const fs = require("fs");
const pify = require("pify");
const {uploader} = require("../handlers");
const {Op} = require("sequelize");
const sequelize = require("sequelize");
const e = require("express");
const {parse} = require("path");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      const {
        minPrice,
        maxPrice,
        search,
        sort,
        category,
        page,
        limit,
      } = req.query;
      const theLimit = parseInt(limit ? limit : 5);
      const offsetData = parseInt((page ? page : 1) - 1) * parseInt(theLimit);
      let orderSort;
      if (sort) {
        if (sort === "ASC") {
          orderSort = [["createdAt", "ASC"]];
        } else {
          orderSort = [["createdAt", "DESC"]];
        }
      }

      let response;
      if (!maxPrice || maxPrice === "false") {
        //KALAU MAXPRICE TIDAK ADA
        if (category && category !== "null") {
          response = await Product.findAll({
            where: {
              [Op.and]: {
                product_price: {[Op.gte]: minPrice ? minPrice : 0},
                product_name: {[Op.substring]: `${search ? search : ""}`},
                product_category_id: category,
                product_is_available: 1,
              },
            },
            offset: offsetData,
            limit: theLimit,
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
          response = await Product.findAll({
            where: {
              [Op.and]: {
                product_price: {[Op.gte]: minPrice ? minPrice : 0},
                product_name: {[Op.substring]: `${search ? search : ""}`},
                product_is_available: 1,
              },
            },
            offset: offsetData,
            limit: theLimit,
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
      } else {
        //KALAU ADA MAX PRICE
        if (minPrice || search) {
          if (category !== "null") {
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
                  product_category_id: category,
                  product_is_available: 1,
                },
              },
              offset: offsetData,
              limit: theLimit,
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
                  product_is_available: 1,
                },
              },
              offset: offsetData,
              limit: theLimit,
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
      }
      if (!limit && !page) {
        response = await Product.findAll({
          where: {
            product_is_available: 1,
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
          [Op.and]: {
            product_id: id,
            product_is_available: 1,
          },
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
          [Op.and]: {
            product_category_id: id,
            product_is_available: 1,
          },
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

        const perML = parseInt(newPrice) / parseInt(newVol);
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
          product_is_available: 1,
          price_per_ml: parseInt(perML),
        });

        if (response) {
          Material_Flow.create({
            product_id: response.dataValues.product_id,
            material_flow_stock: stock_total,
            material_flow_info: "New Product",
            stock: newStock,
            stock_total: stock_total,
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
      const old_stock_total = parseInt(products.dataValues.product_stock_total);
      const newStock = old_stock + parseInt(product_stock);
      const stock_total =
        parseInt(products.dataValues.product_vol) * parseInt(product_stock) +
        old_stock_total;

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
          material_flow_stock:
            parseInt(stock_total) - parseInt(old_stock_total),
          material_flow_info: "Stock added by admin",
          stock: newStock,
          stock_total: stock_total,
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
        const old_stock_total = prods.dataValues.product_stock_total;
        const stockDifference = oldStock - prods.dataValues.product_stock;
        const stock_total =
          parseInt(stockDifference) * parseInt(newVol) + old_stock_total;

        const imagePath = image ? `${path}/${image[0].filename}` : oldImagepath;

        const perML = parseInt(newPrice) / parseInt(newVol);
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
            price_per_ml: parseInt(perML),
          },
          {
            where: {
              product_id: id,
            },
          }
        );

        //MATERIAL FLOW WHEN ADMIN CAN CHANGE DATA
        let info = "";
        let stockChanged = stock_total - old_stock_total;
        if (old_stock_total > stock_total) {
          info = "Stock decreased by admin";
        } else if (old_stock_total < stock_total) {
          info = "Stock added by admin";
        }

        if (stockChanged !== 0) {
          await Material_Flow.create({
            product_id: id,
            material_flow_stock: `${stockChanged}`,
            material_flow_info: `${info}`,
            stock: oldStock,
            stock_total: stock_total,
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
      const {isAvail, stock} = req.body;

      const prods = await Product.findOne({
        where: {
          product_id: id,
        },
      });
      await Product.update(
        {
          product_stock: stock,
          product_stock_total: stock,
          product_is_available: isAvail,
        },
        {
          where: {
            product_id: id,
          },
        }
      );

      await Material_Flow.create({
        product_id: id,
        material_flow_stock: `${-prods.dataValues.product_stock_total}`,
        material_flow_info: "Product deleted by admin",
        stock: stock,
      });
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
            [Op.and]: {
              product_category_id: id,
              product_is_available: 1,
            },
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
            [Op.and]: {
              product_category_id: {
                [Op.eq]: category,
              },
              product_is_available: 1,
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
          [Op.and]: {
            product_name: {
              [Op.substring]: search,
            },
            product_is_available: 1,
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
      if (highest_price === "true") {
        const response = await Product.findAll({
          where: {
            product_is_available: 1,
          },
          attributes: [
            [sequelize.fn("max", sequelize.col("price_per_ml")), "maxPrice"],
          ],
          raw: true,
        });

        const res2 = await Product.findAll({
          where: {
            product_is_available: 1,
          },
        });
        let arrMax = [];
        await res2.forEach((subRes) => {
          arrMax.push(subRes.product_price / subRes.product_vol);
        });
        arrMax = arrMax.sort((a, b) => b - a);
        // maxPriceNew = [0];
        // console.log(arrMax.sort((a, b) => b - a));

        return res.status(200).send(response);
      } else if (price_from && price_to && category) {
        if (category > 0) {
          const response = await Product.findAll({
            where: {
              [Op.and]: {
                price_per_ml: {
                  [Op.and]: {
                    [Op.gte]: price_from,
                    [Op.lte]: price_to,
                  },
                },
                product_category_id: {
                  [Op.eq]: category,
                },
                product_is_available: 1,
              },
            },
          });
          return res.status(200).send(response);
        } else {
          const response = await Product.findAll({
            where: {
              price_per_ml: {
                [Op.and]: {
                  [Op.gte]: price_from,
                  [Op.lte]: price_to,
                },
              },
              product_is_available: 1,
            },
          });
          return res.status(200).send(response);
        }
      } else {
        const response = await Product.findAll({
          where: {
            product_is_available: 1,
          },
          order: [["createdAt", "DESC"]],
        });
        return res.status(200).send(response);
      }
    } catch (err) {
      return res.send(err.message);
    }
  },
  getDeletedProduct: async (req, res) => {
    try {
      const {page, limit, search} = req.query;
      const theLimit = parseInt(limit ? limit : 5);
      const offsetData = parseInt((page ? page : 1) - 1) * parseInt(theLimit);

      const response = await Product.findAll({
        where: {
          [Op.and]: {
            product_name: {[Op.substring]: `${search ? search : ""}`},
            [Op.or]: [{product_is_available: 0}, {product_is_available: 1}],
          },
        },
        offset: offsetData,
        limit: theLimit,
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
      return res.status(500).send(err.message);
    }
  },
};
