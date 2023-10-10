const db = require("../utils/db");

module.exports.findAll = () => {
    return db.execute("SELECT * FROM user");
};

module.exports.findOne = (id) => {
    return db.execute("SELECT * FROM user WHERE user_id = ?", [id]);
};

module.exports.findOneByEmail = (email) => {
    return db.execute("SELECT * FROM user WHERE email = ?", [email]);
};

module.exports.create = (name, email, password) => {
    return db.execute(
        "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
    );
};

module.exports.remove = (id) => {
    return db.execute("DELETE FROM user WHERE user_id = ?", [id]);
};
