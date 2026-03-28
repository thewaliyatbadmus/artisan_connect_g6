const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/", requireAuth, async (req, res) => {
	if (req.user.role !== "customer") {
		return res.status(403).json({ message: "Only customers can create bookings" });
	}

	const { artisan_id, service_date, service_type, contact_phone, message } = req.body;

	if (!artisan_id || !service_date) {
		return res.status(400).json({ message: "Missing required fields" });
	}

	try {
		const [customer] = await pool.query(
			"SELECT customer_id FROM customers WHERE user_id = ?",
			[req.user.user_id]
		);

		if (!customer.length) {
			return res.status(400).json({ message: "Customer profile not found" });
		}

		const [result] = await pool.query(
			`INSERT INTO bookings (customer_id, artisan_id, service_date, service_type, contact_phone, message, status)
			 VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
			[customer[0].customer_id, artisan_id, service_date, service_type, contact_phone, message]
		);

		res.status(201).json({ message: "Booking created", booking_id: result.insertId });
	} catch (err) {
		res.status(500).json({ message: "Failed to create booking", error: err.message });
	}
});

router.get("/my", requireAuth, async (req, res) => {
	try {
		let query, params;

		if (req.user.role === "customer") {
			query = `
				SELECT b.booking_id, b.service_date, b.service_type, b.status, b.message,
					   u.full_name as artisan_name, a.skill, a.hourly_rate
				FROM bookings b
				JOIN artisans a ON b.artisan_id = a.artisan_id
				JOIN users u ON a.user_id = u.user_id
				WHERE b.customer_id = (SELECT customer_id FROM customers WHERE user_id = ?)
				ORDER BY b.booking_id DESC
			`;
			params = [req.user.user_id];
		} else if (req.user.role === "artisan") {
			query = `
				SELECT b.booking_id, b.service_date, b.service_type, b.status, b.message,
					   u.full_name as customer_name, b.contact_phone
				FROM bookings b
				JOIN customers c ON b.customer_id = c.customer_id
				JOIN users u ON c.user_id = u.user_id
				WHERE b.artisan_id = (SELECT artisan_id FROM artisans WHERE user_id = ?)
				ORDER BY b.booking_id DESC
			`;
			params = [req.user.user_id];
		} else {
			return res.status(403).json({ message: "Unsupported role" });
		}

		const [bookings] = await pool.query(query, params);
		res.json(bookings);
	} catch (err) {
		res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
	}
});

router.patch("/:id/status", requireAuth, async (req, res) => {
	const { status } = req.body;

	if (!["pending", "accepted", "completed", "cancelled"].includes(status)) {
		return res.status(400).json({ message: "Invalid status" });
	}

	try {
		await pool.query(
			"UPDATE bookings SET status = ? WHERE booking_id = ?",
			[status, req.params.id]
		);

		res.json({ message: "Booking status updated" });
	} catch (err) {
		res.status(500).json({ message: "Failed to update booking", error: err.message });
	}
});

module.exports = router;
