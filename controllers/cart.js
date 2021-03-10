const CartItem = require("../models/cart_item");
const User = require("../models/user");

exports.get_test = (req, res, next) => {
    const user = new User(1);
    Promise.all([user.get_all_cart_items(), user.get_credits()])
        .then((data) => {
            const credits = data[1].rows[0].credit;
            res.render("cart", {
                pageTitle: "Cart",
                path: "/cart",
                credits: credits,
                items: data[0].rows,
                editing: false,
            });
        })
        .catch((err) => console.log(err));
};

exports.post_test = (req, res, next) => {
    const id = parseInt(req.body.product_id);
    const item = new CartItem(id);
    item.is_valid()
        .then((valid) => {
            if (valid) {
                item.add_to_cart()
                    .then(() => {
                        res.redirect("/cart");
                    })
                    .catch((err) => console.log(err));
            } else {
                res.redirect("/prods");
            }
        })
        .catch((err) => console.log(err));
};
