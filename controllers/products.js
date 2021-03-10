const Prod = require("../models/prod");

exports.get_test = (req, res, next) => {
    Prod.get_all().then(function (result) {
        res.render("products", {
            pageTitle: "All Products",
            path: "/prods",
            items: result.rows,
            editing: false,
        });
    });
};
