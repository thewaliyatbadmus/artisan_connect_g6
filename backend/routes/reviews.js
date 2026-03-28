const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/artisan/:artisanId", async (req, res) => {
	try {
		const [reviews] = await pool.query(`
			SELECT r.review_id, r.rating, r.comment, r.created_at,
				   u.full_name as customer_name
			FROM reviews r
			JOIN bookings b ON r.booking_id = b.booking_id
			JOIN customers c ON b.customer_id = c.customer_id
			JOIN users u ON c.user_id = u.user_id
			WHERE b.artisan_id = ?
			ORDER BY r.created_at DESC
		`, [req.params.artisanId]);

		res.json(reviews);
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
	}
});

router.post("/", requireAuth, async (req, res) => {
	if (req.user.role !== "customer") {
		return res.status(403).json({ message: "Only customers can leave reviews" });
	}

	const { booking_id, rating, comment } = req.body;

	if (!booking_id || !rating) {
		return res.status(400).json({ message: "Missing required fields" });
	}

	if (rating < 1 || rating > 5) {
		return res.status(400).json({ message: "Rating must be between 1 and 5" });
	}

	try {
		const [booking] = await pool.query(
			`SELECT b.booking_id FROM bookings b
			 JOIN customers c ON b.customer_id = c.customer_id
			 WHERE b.booking_id = ? AND c.user_id = ?`,
			[booking_id, req.user.user_id]
		);

		if (!booking.length) {
			return res.status(404).json({ message: "Booking not found" });
		}

		const [result] = await pool.query(
			`INSERT INTO reviews (booking_id, rating, comment) VALUES (?, ?, ?)`,
			[booking_id, rating, comment]
		);

		res.status(201).json({ message: "Review created", review_id: result.insertId });
	} catch (err) {
		res.status(500).json({ message: "Failed to create review", error: err.message });
	}
});

module.exports = router;
