import React, { useState, useEffect, useCallback } from 'react';
import CampUploadForm from './CampUploadForm';
import './Camp.css'
// Helper to format date nicely
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

const BloodCampPage = () => {
  const [activeTab, setActiveTab] = useState('view');
  const [camps, setCamps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCity, setFilterCity] = useState('');

  const fetchCamps = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let url = 'http://localhost:7000/api/camps'; // Use your backend's port
    if (filterCity) {
      url += `?city=${filterCity}`;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) {
        // If no camps are found (404), treat it as an empty list, not an error
        if (res.status === 404) {
          setCamps([]);
        } else {
          const data = await res.json();
          throw new Error(data.message || 'Could not fetch data.');
        }
      } else {
        const data = await res.json();
        setCamps(data);
      }
    } catch (err) {
      setError(err.message);
      setCamps([]); // Clear camps on error
    } finally {
      setIsLoading(false);
    }
  }, [filterCity]);

  useEffect(() => {
    fetchCamps();
  }, [fetchCamps]);
  
  const handleCampAdded = () => {
      setFilterCity(''); // Clear any filter
      setActiveTab('view'); // Switch back to the view tab
      fetchCamps(); // Re-fetch camps immediately
  }

  const renderContent = () => {
    if (activeTab === 'add') {
      return <CampUploadForm onCampAdded={handleCampAdded} />;
    }

    if (isLoading) {
      return (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border loading-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
      <>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by city..."
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
          />
        </div>
        {camps.length > 0 ? (
          <div className="row g-4">
            {camps.map((camp) => (
              <div key={camp._id} className="col-lg-4 col-md-6">
                <div className="card camp-card h-100">
                  <div className="card-header">{camp.organizerName}</div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <i className="fa-solid fa-location-dot"></i>
                      <strong>{camp.city}</strong>, {camp.state}
                    </li>
                    <li className="list-group-item">
                      <i className="fa-solid fa-calendar-days"></i>
                      {formatDate(camp.date)}
                    </li>
                    <li className="list-group-item">
                      <i className="fa-solid fa-clock"></i>
                      {camp.startTime} - {camp.endTime}
                    </li>
                     <li className="list-group-item">
                      <i className="fa-solid fa-phone"></i>
                      {camp.contactPhone}
                    </li>
                    <li className="list-group-item">
                      <i className="fa-solid fa-map-pin"></i>
                      {camp.address}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center my-5">
            <h4>No upcoming camps found.</h4>
            <p className="text-muted">Please check back later or try a different city.</p>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <header className="hero-section">
        <h1>Blood Camp Locator</h1>
        <p className="lead">Find and support blood donation camps near you.</p>
      </header>

      <div className="container my-5">
        <ul className="nav nav-pills nav-fill mb-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'view' ? 'active' : ''}`} onClick={() => setActiveTab('view')}>
              <i className="fa-solid fa-eye"></i> View Camps
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
              <i className="fa-solid fa-plus"></i> Add Camp (Manager)
            </button>
          </li>
        </ul>
        {renderContent()}
      </div>
    </>
  );
};

export default BloodCampPage;