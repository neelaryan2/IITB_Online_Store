const pool = require("../utils/database");
module.exports = class Prod {
    constructor(title, image, price, quantity) {
        this.title = title;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }

    get_new_id() {
        return pool.query("SELECT MAX(id + 1) FROM products");
    }

    add_prod(id) {
        return pool.query(
            "INSERT INTO products(title, price, image, quantity, id) VALUES ($1, $2, $3, $4, $5);",
            [this.title, this.price, this.image, this.quantity, id]
        );
    }
    static get_all() {
        return pool.query("SELECT * FROM products");
    }
};
