const Prod = require("../models/prod");

exports.get_test = (req, res, next) => {
    res.render("admin/add_product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
    });
};

exports.post_test = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const product = new Prod(title, image, price, quantity);
    product
        .get_new_id()
        .then((result) => {
            let id = 1;
            if (result.rows.length > 0) {
                id = result.rows[0].id;
            }
            product
                .add_prod(id)
                .then(() => {
                    res.redirect("/admin/add-product");
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};
