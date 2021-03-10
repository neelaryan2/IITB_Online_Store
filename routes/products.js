const path = require("path");
const express = require("express");

const productsCon = require("../controllers/products");

const router = express.Router();

router.get("/prods", productsCon.get_test);

module.exports = router;
