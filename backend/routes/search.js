const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /artisans/search
// Accept query params: ?skill=&location=&minRating=&priceMin=&priceMax=
router.get('/', async (req, res) => {
  try {
    const { skill, location, minRating, priceMin, priceMax } = req.query;

    let query = `
      SELECT 
        a.artisan_id AS id,
        u.full_name AS name,
        a.skill,
        a.location,
        a.hourly_rate AS hourlyRate,
        IFNULL(AVG(r.rating), 0) AS rating,
        COUNT(r.review_id) AS reviewCount
      FROM artisans a
      JOIN users u ON a.user_id = u.user_id
      LEFT JOIN bookings b ON a.artisan_id = b.artisan_id
      LEFT JOIN reviews r ON b.booking_id = r.booking_id
      WHERE 1=1
    `;

    const values = [];

    // Filter by skill
    if (skill) {
      query += ` AND a.skill LIKE ?`;
      values.push(`%${skill}%`);
    }

    // Filter by location
    if (location) {
      query += ` AND a.location LIKE ?`;
      values.push(`%${location}%`);
    }

    // Filter by price (minimum)
    if (priceMin) {
      query += ` AND a.hourly_rate >= ?`;
      values.push(Number(priceMin));
    }

    // Filter by price (maximum)
    if (priceMax) {
      query += ` AND a.hourly_rate <= ?`;
      values.push(Number(priceMax));
    }

    query += ` GROUP BY a.artisan_id, u.full_name, a.skill, a.location, a.hourly_rate `;

    // Filter by rating (using HAVING because it's an aggregate function)
    if (minRating) {
      query += ` HAVING rating >= ?`;
      values.push(Number(minRating));
    }

    // Execute query
    const [rows] = await db.query(query, values);

    res.json(rows);
  } catch (error) {
    console.error('Search query error:', error);
    res.status(500).json({ message: 'Internal server error while searching artisans' });
  }
});

module.exports = router;

