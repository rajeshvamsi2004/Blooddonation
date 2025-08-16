import React, { useState } from 'react';
import './Camp.css';
const CampUploadForm = ({ onCampAdded }) => {
  const [formData, setFormData] = useState({
    organizerName: '',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    date: '',
    startTime: '',
    endTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    // Basic validation
    for (const key in formData) {
      if (!formData[key]) {
        setError('Please fill out all fields.');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      // IMPORTANT: Use the port your backend is running on (e.g., 7000)
      const res = await fetch('http://localhost:7000/api/camps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create camp.');
      }

      setSuccess('Camp created successfully! It is now visible to users.');
      setFormData({ organizerName: '', contactPhone: '', address: '', city: '', state: '', date: '', startTime: '', endTime: '' });
      if (onCampAdded) onCampAdded(); // Callback to refresh the list

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h3><i className="fa-solid fa-plus-circle"></i> Add New Blood Camp</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Organizer Name</label>
            <input type="text" name="organizerName" value={formData.organizerName} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Contact Phone</label>
            <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="form-control" />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Address / Venue</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Start Time</label>
            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">End Time</label>
            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="form-control" />
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-danger w-100" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create Camp'}
        </button>
      </form>
    </div>
  );
};

export default CampUploadForm;