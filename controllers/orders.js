const e = require("express");
const User = require("../models/user");

exports.get_test = (req, res, next) => {
    const user = new User(1);
    user.get_all_orders()
        .then((data) => {
            res.render("orders", {
                pageTitle: "Orders",
                path: "/orders",
                items: data.rows,
                editing: false,
            });
        })
        .catch((err) => console.log(err));
};

exports.post_test = (req, res, next) => {
    const id = parseInt(req.body.product_id);
    const user = new User(1);
    user.buy_from_cart()
        .then((result) => {
            if (result.length == 0) {
                res.redirect("/cart");
            } else {
                res.redirect("/orders");
            }
        })
        .catch((err) => console.log(err));
};
