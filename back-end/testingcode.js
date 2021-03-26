// const moment = require("moment");

// const invoice = `INV/22/${Date.now()}`;
// console.log(invoice);
// const date = moment().format("YYYY-MM-DD HH:mm:ss");

// const dad = new Date().toISOString().slice(0, 19).replace("T", " ");
// console.log(date);
// console.log(typeof dad);

export const adminFetchTransaction = async (req, res) => {
  try {
    // const { user_id } = req.query;
    // * iniiiiiiiiiiiiiiiii buat ambil transaction invoice dan totalnya
    const response4 = await Transaction.findAll({
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
    //* inii buat ambil custom product idnya doang
    const responseCustom = await Transaction.findAll({
      where: {
        custom_product_id: {
          [Op.ne]: null,
        },
      },
      raw: true,
      group: ["custom_product_id"],
      attributes: ["custom_product_id", "transaction_invoice_number"],
    });
    //* ini buat ambil semua transaction by invoice number
    let response5 = await Transaction.findAll({
      where: {
        transaction_invoice_number: {
          [Op.in]: response4.map((val) => {
            return val.transaction_invoice_number;
          }),
        },
      },
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
    // * ini buat ambil custom product yg ada di transaction tp dipisahin gitu
    const customres = await Custom_Product.findAll({
      where: {
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
        custom_data: customres.filter((customs) => {
          return (
            customs.Transactions[0].transaction_invoice_number ===
            val.transaction_invoice_number
          );
        }),
      };
    });

    return res.send(arr);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
