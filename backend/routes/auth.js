const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

function signToken(user) {
	return jwt.sign(
		{ user_id: user.user_id, role: user.role },
		process.env.JWT_SECRET || "dev_secret_change_me",
		{ expiresIn: "7d" }
	);
}

async function getUserProfile(userId) {
	const [rows] = await pool.query(
		`SELECT u.user_id, u.full_name, u.email, u.role,
						a.skill, a.hourly_rate, a.location AS artisan_location, a.experience, a.phone AS artisan_phone,
						c.location AS customer_location
			 FROM users u
			 LEFT JOIN artisans a ON a.user_id = u.user_id
			 LEFT JOIN customers c ON c.user_id = u.user_id
			WHERE u.user_id = ?`,
		[userId]
	);

	if (!rows.length) return null;
	const row = rows[0];

	return {
		id: row.user_id,
		name: row.full_name,
		email: row.email,
		role: row.role,
		skill: row.skill || null,
		profession: row.skill || null,
		rate: row.hourly_rate || null,
		hourlyRate: row.hourly_rate || null,
		location: row.artisan_location || row.customer_location || null,
		experience: row.experience || 0,
		phone: row.artisan_phone || null,
	};
}

router.post("/register", async (req, res) => {
	const {
		name,
		full_name,
		email,
		password,
		role,
		phone,
		location,
		profession,
		skill,
		rate,
		hourlyRate,
	} = req.body;

	const finalName = (full_name || name || "").trim();
	const finalRole = (role || "").trim();

	if (!finalName || !email || !password || !finalRole) {
		return res.status(400).json({ message: "Missing required fields" });
	}

	if (!["artisan", "customer"].includes(finalRole)) {
		return res.status(400).json({ message: "Invalid role" });
	}

	try {
		const [existing] = await pool.query("SELECT user_id FROM users WHERE email = ?", [email]);
		if (existing.length) {
			return res.status(409).json({ message: "Email is already registered" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const [userResult] = await pool.query(
			"INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)",
			[finalName, email, hashedPassword, finalRole]
		);

		const userId = userResult.insertId;

		if (finalRole === "artisan") {
			await pool.query(
				`INSERT INTO artisans (user_id, skill, hourly_rate, location, availability, experience, phone)
				 VALUES (?, ?, ?, ?, 'Available', 0, ?)`,
				[
					userId,
					(skill || profession || "").trim() || null,
					Number(hourlyRate || rate || 0),
					(location || "").trim() || null,
					(phone || "").trim() || null,
				]
			);
		} else {
			await pool.query(
				"INSERT INTO customers (user_id, location) VALUES (?, ?)",
				[userId, (location || "").trim() || null]
			);
		}

		const user = await getUserProfile(userId);
		const token = signToken({ user_id: userId, role: finalRole });

		return res.status(201).json({ message: "Account created", token, user });
	} catch (err) {
		return res.status(500).json({ message: "Failed to register", error: err.message });
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ message: "Email and password are required" });
	}

	try {
		const [rows] = await pool.query(
			"SELECT user_id, full_name, email, password, role FROM users WHERE email = ?",
			[email]
		);

		if (!rows.length) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const dbUser = rows[0];
		const ok = await bcrypt.compare(password, dbUser.password);
		if (!ok) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const user = await getUserProfile(dbUser.user_id);
		const token = signToken(dbUser);

		return res.json({ message: "Login successful", token, user });
	} catch (err) {
		return res.status(500).json({ message: "Failed to login", error: err.message });
	}
});

router.get("/me", requireAuth, async (req, res) => {
	try {
		const user = await getUserProfile(req.user.user_id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		return res.json({ user });
	} catch (err) {
		return res.status(500).json({ message: "Failed to fetch profile", error: err.message });
	}
});

module.exports = router;
