const moment = require("moment");

const invoice = `INV/22/${Date.now()}`;
console.log(invoice);
const date = moment().format("YYYY-MM-DD HH:mm:ss");

const dad = new Date().toISOString().slice(0, 19).replace("T", " ");
console.log(date);
// console.log(typeof dad);
