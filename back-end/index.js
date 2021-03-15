const app = require("express")();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => console.log(`SERVER LISTENING AT PORT ${PORT}`));
