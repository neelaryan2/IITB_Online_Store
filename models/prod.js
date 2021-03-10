const pool = require("../utils/database");
module.exports = class Prod {
    constructor(title, image, price, quantity) {
        this.title = title;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }

    add_prod() {
        return pool.query(
            `WITH T AS ((SELECT id FROM products) UNION (SELECT 0 AS id))
            INSERT INTO products(title, price, image, quantity, id) 
            VALUES ($1, $2, $3, $4, (SELECT MAX(T.id + 1) FROM T));`,
            [this.title, this.price, this.image, this.quantity]
        );
    }
    static get_all() {
        return pool.query("SELECT * FROM products");
    }
};
