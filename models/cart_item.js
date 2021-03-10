const pool = require("../utils/database");
module.exports = class CartItem {
    constructor(item_id) {
        this.item_id = item_id;
        this.user_id = 1;
        this.quantity = 1;
    }

    add_to_cart() {
        return pool
            .query(
                `INSERT INTO cart(user_id, item_id, quantity) VALUES ($1, $2, $3) 
                ON CONFLICT (user_id, item_id) 
                DO UPDATE SET quantity = EXCLUDED.quantity + cart.quantity`,
                [this.user_id, this.item_id, this.quantity]
            )
            .then(() => {
                return pool.query(
                    "UPDATE products SET quantity = quantity - $1 WHERE id = $2",
                    [this.quantity, this.item_id]
                );
            })
            .catch((err) => console.log(err));
    }

    is_valid() {
        return pool
            .query("SELECT quantity FROM products WHERE id = $1", [
                this.item_id,
            ])
            .then((result) => {
                if (result.rows.length != 1) {
                    throw new Error("Invalid  Product");
                }
                return result.rows[0].quantity >= this.quantity;
            })
            .catch((err) => console.log(err));
    }
};
