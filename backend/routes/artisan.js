const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const [artisans] = await pool.query(`
			SELECT
				a.artisan_id,
				a.user_id,
				u.full_name,
				a.skill,
				a.hourly_rate,
				a.location,
				a.availability,
				a.experience,
				a.phone,
				a.bio,
				COALESCE(AVG(r.rating), 0) as rating,
				COUNT(r.review_id) as review_count
			FROM artisans a
			JOIN users u ON a.user_id = u.user_id
			LEFT JOIN bookings b ON a.artisan_id = b.artisan_id
			LEFT JOIN reviews r ON b.booking_id = r.booking_id
			GROUP BY a.artisan_id
		`);
		res.json(artisans);
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch artisans", error: err.message });
	}
});

router.post("/profile", requireAuth, async (req, res) => {
	if (req.user.role !== "artisan") {
		return res.status(403).json({ message: "Only artisans can create profiles" });
	}

	const { skill, hourly_rate, location, availability, experience, phone, bio } = req.body;

	try {
		const [existing] = await pool.query(
			"SELECT artisan_id FROM artisans WHERE user_id = ?",
			[req.user.user_id]
		);

		if (existing.length) {
			await pool.query(
				`UPDATE artisans SET skill = ?, hourly_rate = ?, location = ?, availability = ?,
				 experience = ?, phone = ?, bio = ? WHERE user_id = ?`,
				[skill, hourly_rate, location, availability, experience, phone, bio, req.user.user_id]
			);
		} else {
			await pool.query(
				`INSERT INTO artisans (user_id, skill, hourly_rate, location, availability, experience, phone, bio)
				 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
				[req.user.user_id, skill, hourly_rate, location, availability, experience, phone, bio]
			);
		}

		res.json({ message: "Profile saved" });
	} catch (err) {
		res.status(500).json({ message: "Failed to save profile", error: err.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const [artisans] = await pool.query(`
			SELECT
				a.artisan_id,
				a.user_id,
				u.full_name,
				a.skill,
				a.hourly_rate,
				a.location,
				a.availability,
				a.experience,
				a.phone,
				a.bio,
				COALESCE(AVG(r.rating), 0) as rating,
				COUNT(r.review_id) as review_count
			FROM artisans a
			JOIN users u ON a.user_id = u.user_id
			LEFT JOIN bookings b ON a.artisan_id = b.artisan_id
			LEFT JOIN reviews r ON b.booking_id = r.booking_id
			WHERE a.artisan_id = ?
			GROUP BY a.artisan_id
		`, [req.params.id]);

		if (!artisans.length) {
			return res.status(404).json({ message: "Artisan not found" });
		}

		const [reviews] = await pool.query(
			`SELECT r.review_id, r.rating, r.comment, r.created_at, u.full_name
			 FROM reviews r
			 JOIN bookings b ON r.booking_id = b.booking_id
			 JOIN customers c ON b.customer_id = c.customer_id
			 JOIN users u ON c.user_id = u.user_id
			 WHERE b.artisan_id = ?
			 ORDER BY r.created_at DESC`,
			[req.params.id]
		);

		res.json({ ...artisans[0], reviews });
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch artisan", error: err.message });
	}
});

router.put("/profile", requireAuth, async (req, res) => {
	if (req.user.role !== "artisan") {
		return res.status(403).json({ message: "Only artisans can update profiles" });
	}

	const { skill, hourly_rate, location, availability, experience, phone, bio } = req.body;

	try {
		await pool.query(
			`UPDATE artisans SET skill = ?, hourly_rate = ?, location = ?, availability = ?,
			 experience = ?, phone = ?, bio = ? WHERE user_id = ?`,
			[skill, hourly_rate, location, availability, experience, phone, bio, req.user.user_id]
		);
		res.json({ message: "Profile updated" });
	} catch (err) {
		res.status(500).json({ message: "Failed to update profile", error: err.message });
	}
});

module.exports = router;
