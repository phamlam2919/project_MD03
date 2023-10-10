const db = require("../utils/db");
const usersService = require("../services/users.service");

module.exports.findAll = async (req, res) => {
    try {
        let data = await usersService.findAll();
        let [rows] = data;
        res.json({
            status: "success",
            users: rows,
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};

module.exports.findOne = async (req, res) => {
    let { id } = req.params;
    try {
        let data = await usersService.findOne(id);
        let [rows] = data;
        if (rows.length === 0) {
            res.json({
                message: "User not found",
            });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        res.json({
            error,
        });
    }
};

module.exports.create = async (req, res) => {
    let { name, email, password } = req.body;
    // validate email, password

    try {
        await usersService.create(name, email, password);
        res.json({
            message: "Create user successfully",
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};

module.exports.update = async (req, res) => {
    let { id } = req.params;
    let { name, email, password } = req.body;
    try {
        let updateUser = await db.execute(
            `SELECT * FROM user WHERE user_id = ?`,
            [id]
        );
        let rowUser = updateUser[0];
        console.log(rowUser);
        if (rowUser === 0) {
            res.json({
                message: `Users với id = ${id} k tồn tại`,
            });
        } else {
            await db.execute(
                `UPDATE user SET name = ?, email = ?, password = ? WHERE users_id = ?`,
                [
                    name || rowUser[0].name,
                    email || rowUser[0].email,
                    password || rowUser[0].password,

                    id,
                ]
            );
            res.json({
                message: "Update user success",
            });
        }
    } catch (error) {
        res.json({
            messenge: "Update not success",
        });
    }
};

module.exports.remove = async (req, res) => {
    let { id } = req.params;
    try {
        await usersService.remove(+id);
        res.json({
            status: "success",
            message: "Delete user successfully",
        });
    } catch (error) {
        res.json({
            status: "fail",
            error,
        });
    }
};
