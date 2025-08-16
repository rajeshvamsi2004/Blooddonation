import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBloodCampsByCity() {
  const [city, setCity] = useState('');
  const [camps, setCamps] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    if (!city.trim()) {
      setMessage("Please enter a city name before searching.");
      setCamps([]);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/City', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ City: city }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setCamps(data);
        setMessage('');
      } else {
        const errorText = await response.text();
        setCamps([]);
        setMessage(errorText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Network or Server Error");
      setCamps([]);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h2 style={{fontFamily: 'sans-serif', fontSize: '25px', fontWeight: 'bold'}}>Search Blood Camps</h2>
      <form
        className="bloodcampsearchdiv"
        onSubmit={handleSearch}
        style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
      >
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '8px', width: '200px', fontFamily: 'sans-serif' }}
        />
        <button
          type="submit"
          style={{ padding: '8px 16px', display: 'flex', alignItems: 'center' }}
        >
          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '6px' }} />
          Search
        </button>
      </form>

      {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}

      {camps.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Blood Camps Found:</h3>
          {camps.map((camp, index) => (
            <div  key={index} style={{ marginBottom: '10px' }}>
              <strong>Organizer: {camp.Organizer}</strong><br/> <strong> Place: {camp.Place}</strong><br />
              City: {camp.City} | Date: {camp.Date} <br />
              Time: {camp.Time.Start} - {camp.Time.End}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBloodCampsByCity;
