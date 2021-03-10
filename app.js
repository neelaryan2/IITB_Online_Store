const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const adminRo = require("./routes/admin");
const productsRo = require("./routes/products");
const cartRo = require("./routes/cart");
const ordersRo = require("./routes/orders");
const pool = require("./utils/database");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRo);
app.use("/", productsRo);
app.use("/", cartRo);
app.use("/", ordersRo);

const port = 3000;
app.listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);
