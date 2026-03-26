const express = require("express");
const router = express.Router();

let artisans = [];

router.get("/test", (req, res) => {
  res.json({ message: "Artisan API working" });
});

router.get("/", (req, res) => {
  res.json(artisans);
});

router.post("/profile", (req, res) => {
  const {
    name,
    skill,
    location,
    experience,
    phone,
    hourlyRate,
    priceRange,
    bio
  } = req.body;

  if (!name || !skill || !location) {
    return res.status(400).json({
      message: "Missing required fields (name, skill, location)"
    });
  }

  const newArtisan = {
    id: Date.now(),
    name,
    skill,
    location,
    experience: Number(experience) || 0,
    phone,
    hourlyRate: Number(hourlyRate) || 0,
    priceRange,
    bio,
    rating: 0,
    reviewCount: 0,
    available: true,
    portfolio: [],
    reviews: []
  };

  artisans.push(newArtisan);

  res.status(201).json({
    message: "Profile created successfully",
    artisan: newArtisan
  });
});

router.get("/:id", (req, res) => {
  const artisan = artisans.find(a => a.id == req.params.id);

  if (!artisan) {
    return res.status(404).json({
      message: "Artisan not found"
    });
  }

  res.json(artisan);
});

router.put("/profile", (req, res) => {
  const { id } = req.body;

  const artisanIndex = artisans.findIndex(a => a.id == id);

  if (artisanIndex === -1) {
    return res.status(404).json({
      message: "Artisan not found"
    });
  }

  artisans[artisanIndex] = {
    ...artisans[artisanIndex],
    ...req.body
  };

  res.json({
    message: "Profile updated successfully",
    artisan: artisans[artisanIndex]
  });
});

module.exports = router;
