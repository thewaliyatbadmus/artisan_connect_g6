import React, { useState, useEffect } from "react";

export default function CreateProfile({ onNavigate }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState({
    skill: "",
    location: "",
    experience: "",
    phone: "",
    hourlyRate: "",
    bio: ""
  });

  useEffect(() => {
    // Check if user is logged in and is an artisan
    const token = localStorage.getItem("token");
    if (!token) {
      onNavigate("login");
      return;
    }

    // Fetch user profile to verify role
    fetch("http://localhost:5000/api/auth/me", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user?.role !== "artisan") {
          // Redirect customers back to dashboard
          onNavigate("dashboard");
        } else {
          setChecked(true);
        }
      })
      .catch(() => onNavigate("login"));
  }, [onNavigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in as an artisan");
      return;
    }

    if (!form.skill || !form.location || !form.hourlyRate) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/artisan/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          skill: form.skill,
          hourly_rate: Number(form.hourlyRate),
          location: form.location,
          experience: Number(form.experience) || 0,
          phone: form.phone,
          bio: form.bio
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save profile");
      }

      onNavigate("dashboard");
    } catch (err) {
      setError(err.message || "An error occurred while saving");
      setLoading(false);
    }
  };

  // Show loading while checking user role
  if (!checked) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "2rem auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>Complete Your Artisan Profile</h2>
        <p style={{ color: "#666", fontSize: "0.95rem" }}>
          Fill in your details so customers can find and hire you.
        </p>
      </div>

      {error && (
        <div style={{
          background: "#fee2e2",
          color: "#991b1b",
          padding: "0.75rem 1rem",
          borderRadius: "0.5rem",
          marginBottom: "1.5rem",
          fontSize: "0.9rem",
          border: "1px solid #fecaca"
        }}>
           {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <label style={{ display: "block", fontWeight: 500, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
            Your Skill *
          </label>
          <input
            name="skill"
            placeholder="e.g., Plumber, Electrician, Carpenter"
            value={form.skill}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
              fontSize: "0.95rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontWeight: 500, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
            Location *
          </label>
          <input
            name="location"
            placeholder="Your city or area"
            value={form.location}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
              fontSize: "0.95rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontWeight: 500, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
              Years of Experience
            </label>
            <input
              name="experience"
              type="number"
              min="0"
              placeholder="5"
              value={form.experience}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 500, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
              Hourly Rate (RWF) *
            </label>
            <input
              name="hourlyRate"
              type="number"
              min="0"
              placeholder="5000"
              value={form.hourlyRate}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
                boxSizing: "border-box"
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontWeight: 500, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
            Phone Number
          </label>
          <input
            name="phone"
            placeholder="+250788123456"
            value={form.phone}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
              fontSize: "0.95rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontWeight: 500, marginBottom: "0.5rem", fontSize: "0.9rem" }}>
            Bio (Optional)
          </label>
          <textarea
            name="bio"
            placeholder="Tell customers about yourself and your expertise..."
            value={form.bio}
            onChange={handleChange}
            rows="4"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
              fontSize: "0.95rem",
              boxSizing: "border-box",
              fontFamily: "inherit",
              resize: "vertical"
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.85rem 1.5rem",
            background: loading ? "#ccc" : "#1a6b4a",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "0.5rem",
            transition: "background 0.2s"
          }}
          onMouseEnter={e => !loading && (e.target.style.background = "#155e3b")}
          onMouseLeave={e => !loading && (e.target.style.background = "#1a6b4a")}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
