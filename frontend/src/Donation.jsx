import React, { useState } from "react";
import CountUp from "react-countup";
import { FaUserFriends, FaUniversity, FaTint, FaMapMarkerAlt } from 'react-icons/fa';
import "./Donation.css"; // Import the external CSS

function Donation() {
  const [location, setLocation] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!location || !bloodGroup) {
      setError("Please enter both location and blood group");
      setResult(null); // Clear previous results
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `http://localhost:5003/search?location=${encodeURIComponent(location)}&blood_group=${encodeURIComponent(bloodGroup)}`
      );

      if (!res.ok) {
        // More specific error for user feedback
        const errorData = await res.json().catch(() => ({ error: "Server error" }));
        throw new Error(errorData.error || "Failed to fetch data");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching data. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation-container">
      <h2>Search Blood Availability</h2>

      <div className="search-form">
        <div className="input-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter a city"
          />
        </div>

        <div className="input-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <input
            id="bloodGroup"
            type="text"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            placeholder="e.g., O+, AB-"
          />
        </div>

        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="results-container">
          <div className="results-header">
            <h3>Availability in {result.location}</h3>
            <p>
              Showing results for blood group: <strong>{result.blood_group}</strong>
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <FaUserFriends className="icon icon-donors" />
              <h4>
                <CountUp end={result.donors} duration={2.5} />
              </h4>
              <p>Available Donors</p>
            </div>

            <div className="stat-card">
              <FaUniversity className="icon icon-banks" />
              <h4>
                <CountUp end={result.blood_banks} duration={2.5} />
              </h4>
              <p>Blood Banks</p>
            </div>

            <div className="stat-card">
              <FaTint className="icon icon-units" />
              <h4>
                <CountUp end={result.total_units} duration={2.5} />
              </h4>
              <p>Total Units</p>
            </div>
            
            <div className="stat-card">
                <FaMapMarkerAlt className="icon icon-location" />
                <h4>{result.location}</h4>
                <p>Searched Location</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Donation;