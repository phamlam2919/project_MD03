const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get("/", (req, res) => {
    res.json({
        message: "GET ALL MEDIA",
    });
});

router.post("/", async (req, res) => {
    try {
        const { product_id, source } = req.body;

        // Chèn dữ liệu hình ảnh vào cơ sở dữ liệu
        const insertQuery = `
        INSERT INTO media (product_id, source)
        VALUES (?, ?)
      `;

        const result = await db.execute(insertQuery, [product_id, source]);
        console.log(result);
        // Trả về phản hồi thành công
        res.status(201).json({ message: "Image added successfully" });
    } catch (error) {
        console.error("Error adding image:", error);
        res.status(500).json({
            error,
            message: "Failed to add image",
        });
    }
});

module.exports = router;
