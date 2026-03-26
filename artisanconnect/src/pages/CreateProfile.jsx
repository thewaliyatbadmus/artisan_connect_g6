
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    skill: "",
    location: "",
    experience: "",
    phone: "",
    hourlyRate: "",
    priceRange: "", 
    bio: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newArtisan = {
      id: Date.now(), 
      ...form,
      rating: 0,
      reviewCount: 0,
      available: true,
      photo: "",
      coverPhoto: "",
      portfolio: [],
      reviews: []
    };

    // Navigate to profile page and pass artisan as state
    navigate("/profile", {
      state: { artisan: newArtisan }
    });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h2>Create Your Profile</h2>
      <p style={{ color: "gray" }}>
        Fill in your details so customers can find you.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        /><br/><br/>
        
        <input
          name="skill"
          placeholder="Your Skill (e.g plumber)"
          onChange={handleChange}
          required
        /><br/><br/>
        
        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        /><br/><br/>
        
        <input
          name="experience"
          placeholder="Years of Experience"
          onChange={handleChange}
          required
        /><br/><br/>
        
        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        /><br/><br/>
        
        <input
          name="hourlyRate"
          placeholder="Hourly Rate"
          onChange={handleChange}
          required
        /><br/><br/>

        <input
          name="priceRange"
          placeholder="Price Range (e.g., 10–50)"
          onChange={handleChange}
          required
        /><br/><br/>
        
        <textarea
          name="bio"
          placeholder="Tell us about yourself"
          onChange={handleChange}
          required
        /><br/><br/>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

