const express = require("express");
const db = require("../utils/db");
const {
    filterByCategory,
    pagination,
} = require("../middlewares/product.middlewares");

//
const router = express.Router();

router.get("/", filterByCategory, pagination, async (req, res) => {
    try {
        let result = await db.execute(
            "SELECT p.*, c.description from product AS p INNER JOIN category AS c ON c.category_id = p.category_id"
        );
        let [rows] = result;
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
});

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let result = await db.execute(
            `SELECT p.*, m.source, m.media_id, c.description
      FROM product as p INNER JOIN media as m
      ON p.product_id = m.product_id 
      inner join category as c on p.category_id = c.category_id
      WHERE p.product_id = ?`,
            [id]
        );
        let [rows] = result;

        if (rows.length === 0) {
            let result2 = await db.execute(
                `SELECT p.*, c.description
        FROM product as p
        inner join category as c on p.category_id = c.category_id
        WHERE p.product_id = ?`,
                [id]
            );
            let [rows2] = result2;
            res.status(200).json(rows2[0]);
        } else {
            let sources = [];
            let product = rows.reduce((pre, cur) => {
                sources.push({ url: cur.source, media_id: cur.media_id });
                return { ...cur, sources: [...sources] };
            }, {});
            console.log(product);
            //
            delete product.source;
            //
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        let { name, number, price, sale, category_id } = req.body;
        let data = await db.execute(
            `INSERT INTO product (name, number, price, sale, category_id) VALUE(?, ?, ?, ?, ?)`,
            [name, number, price, sale, category_id]
        );
        res.json({
            message: "Add new product",
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    let { name, price, stock, sale, category_id } = req.body;
    // console.log(name, price, stock, sale, category_id);
    try {
        let result = await db.execute(
            `UPDATE product SET name = ?, price = ?, number = ?, sale = ?, category_id = ?  WHERE product_id = ?`,
            [name, price, stock, sale, category_id, id]
        );
        console.log(result);
        res.status(200).json({
            status: "Success",
            message: "Update Product",
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id/media/:mediaId", async (req, res) => {
    let { id, mediaId } = req.params;
    let result = await db.execute(
        "UPDATE media SET product_id = ? WHERE media_id = ?",
        [null, mediaId]
    );
    console.log(result);
    try {
        res.status(200).json({
            message: `delete image from product with id=${id} `,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await db.execute("DELETE FROM product WHERE product_id = ?", [id]);
        console.log("step 1");
        let data = await db.execute("SELECT * FROM product");
        let rows = data[0];
        // console.log(rows);
        res.json({
            message: "Đã delete thành công",
            rows,
        });
    } catch (error) {
        res.status(500).json({
            message: "Delete not success",
            error: error,
        });
    }
});
module.exports = router;
