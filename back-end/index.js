const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const {
    productRouter,
    categoryRouter,
    userRouter
} = require("./router");

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.status(200).send("Commerce API");
  });
app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`SERVER LISTENING AT PORT ${PORT}`));
