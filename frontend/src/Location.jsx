// All standard ES6 imports are at the top.
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaHeartbeat, FaMapMarkerAlt, FaSearch, FaCrosshairs, FaTint } from 'react-icons/fa';
import './Location.css';

// --- THE BULLETPROOF FIX FOR MAPBOX IN REACT ---
// eslint-disable-next-line import/no-webpack-loader-syntax
const mapboxgl = require('mapbox-gl');
// @ts-ignore
mapboxgl.workerClass = require('mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
// --- END OF FIX ---

function Location() {
  // State management
  const [search, setSearch] = useState({ state: '', district: '', city: '' });
  const [bloodGroup, setBloodGroup] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState('');
  const [hoveredResultId, setHoveredResultId] = useState(null);

  // Refs for map and markers
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  // Initialize map
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.9629, 20.5937], // Default center of India
      zoom: 4,
    });
  });
  
  // Generic search execution function
  const executeSearch = async (params) => {
    setIsLoading(true);
    setError('');
    setResults([]);

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add blood group to every search if selected
    if (bloodGroup) {
      params.set('bloodGroup', bloodGroup);
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/bloodbanks/search?${params.toString()}`);
      setResults(response.data);
      if (response.data.length === 0) {
        setError('No blood banks found for this criteria. Try a broader search.');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('No blood banks found for this criteria. Try a broader search.');
      } else {
        setError('An error occurred while fetching data. Please try again later.');
      }
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
      setIsLocating(false);
    }
  };

  // Handle manual text search
  const handleFormSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.state) params.set('state', search.state);
    if (search.district) params.set('district', search.district);
    if (search.city) params.set('city', search.city);
    executeSearch(params);
  };
  
  // Handle "Use My Location" search
  const handleLocationSearch = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const params = new URLSearchParams({
            latitude: latitude.toString(),
            longitude: longitude.toString()
        });
        setSearch({ state: '', district: '', city: '' }); // Clear text fields
        executeSearch(params);
      },
      () => {
        setError("Unable to retrieve your location. Please enable location services.");
        setIsLocating(false);
      }
    );
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({ ...prevState, [name]: value }));
  };

  // Effect to update map when results change
  useEffect(() => {
    if (!map.current || results.length === 0) return;
    const bounds = new mapboxgl.LngLatBounds();
    const newMarkers = results.map(bank => {
      const markerEl = document.createElement('div');
      markerEl.className = 'mapboxgl-marker';
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([bank.longitude, bank.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${bank.name}</h3><p>${bank.address}</p>`))
        .addTo(map.current);
      marker.getElement().id = `marker-${bank.id}`;
      bounds.extend([bank.longitude, bank.latitude]);
      return marker;
    });
    markersRef.current = newMarkers;
    map.current.fitBounds(bounds, {
      padding: { top: 100, bottom: 100, left: 100, right: 100 },
      maxZoom: 14,
      duration: 1000,
    });
  }, [results]);

  // Effect to highlight marker on hover
  useEffect(() => {
    markersRef.current.forEach(marker => {
      const markerEl = marker.getElement();
      const markerId = `marker-${hoveredResultId}`;
      if (markerEl.id === markerId) {
        markerEl.classList.add('highlighted-marker');
      } else {
        markerEl.classList.remove('highlighted-marker');
      }
    });
  }, [hoveredResultId]);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="app-container">
      <header>
        <FaHeartbeat size={32} />
        <h1>BloodLink Finder</h1>
      </header>
      <main className="main-content">
        <aside className="search-panel">
          <form className="search-form" onSubmit={handleFormSearch}>
            <h2>Find a Blood Bank</h2>
            
            <div className="form-group">
                <FaTint className="input-icon" />
                <select 
                    value={bloodGroup} 
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="blood-group-select"
                >
                    <option value="">Any Blood Group</option>
                    {bloodTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>
            
            <div className="divider-text">Search by Location Name</div>

            <div className="form-group">
              <input type="text" name="state" placeholder="State" value={search.state} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="text" name="district" placeholder="District" value={search.district} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <input type="text" name="city" placeholder="City" value={search.city} onChange={handleInputChange} />
            </div>
            
            <button type="submit" className="search-button" disabled={isLoading}>
              <FaSearch /> {isLoading ? 'Searching...' : 'Search'}
            </button>

            <div className="divider-text">OR</div>

            <button type="button" className="location-button" onClick={handleLocationSearch} disabled={isLocating}>
                <FaCrosshairs /> {isLocating ? 'Locating...' : 'Use My Location'}
            </button>
          </form>

          <div className="results-container">
            {(isLoading || isLocating) && (
              <div className="feedback-container"><div className="loader"></div></div>
            )}
            {error && !isLoading && (
              <div className="feedback-container"><p>{error}</p></div>
            )}
            {!isLoading && !error && results.length > 0 && (
              results.map((bank) => (
                <div
                  key={bank.id}
                  className="result-item"
                  onMouseEnter={() => setHoveredResultId(bank.id)}
                  onMouseLeave={() => setHoveredResultId(null)}
                >
                  <h3>{bank.name}</h3>
                  <p><FaMapMarkerAlt /> {`${bank.city}, ${bank.state}`}</p>
                   {bank.distance && <p className="distance-info">Approx. {Math.round(bank.distance)} km away</p>}
                </div>
              ))
            )}
          </div>
        </aside>

        <section className="map-panel">
          <div ref={mapContainer} id="map" />
        </section>
      </main>
    </div>
  );
}

export default Location;