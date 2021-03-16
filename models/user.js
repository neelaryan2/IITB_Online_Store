const pool = require("../utils/database");

module.exports = class User {
    constructor(user_id) {
        this.user_id = user_id;
    }

    get_all_cart_items() {
        return pool.query(
            "SELECT P.title, P.image, P.price, C.quantity, C.item_id FROM cart AS C, products AS P WHERE C.user_id = $1 AND C.item_id = P.id",
            [this.user_id]
        );
    }

    get_all_orders() {
        return pool.query(
            "SELECT P.title, P.image, P.price, O.quantity, O.item_id FROM orders AS O, products AS P WHERE O.user_id = $1 AND O.item_id = P.id",
            [this.user_id]
        );
    }

    get_credits() {
        return pool.query("SELECT credit FROM users WHERE user_id = $1", [
            this.user_id,
        ]);
    }

    buy_from_cart() {
        return Promise.all([this.get_all_cart_items(), this.get_credits()])
            .then((data) => {
                const items = data[0].rows;
                const credits = data[1].rows[0].credit;
                let cost = 0;
                items.forEach((item) => {
                    cost += item.quantity * item.price;
                });
                if (credits < cost) {
                    console.log("Insufficient funds.");
                    return Promise.all([]);
                }
                var queries = [];
                queries.push(
                    pool.query(
                        "UPDATE users SET credit = $1 WHERE user_id = $2",
                        [credits - cost, this.user_id]
                    )
                );
                items.forEach((item) => {
                    queries.push(
                        pool.query(
                            `INSERT INTO orders(user_id, item_id, quantity) VALUES ($1, $2, $3) 
                            ON CONFLICT (user_id, item_id) 
                            DO UPDATE SET quantity = EXCLUDED.quantity + orders.quantity`,
                            [this.user_id, item.item_id, item.quantity]
                        )
                    );
                });
                queries.push(pool.query("DELETE FROM cart"));
                return Promise.all(queries);
            })
            .catch((err) => console.log(err));
    }
};
