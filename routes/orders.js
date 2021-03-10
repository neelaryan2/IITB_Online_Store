const path = require("path");
const express = require("express");

const ordersCon = require("../controllers/orders");

const router = express.Router();

router.get("/orders", ordersCon.get_test);
router.post("/orders", ordersCon.post_test);

module.exports = router;
