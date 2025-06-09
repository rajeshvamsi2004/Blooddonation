import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function DonorDashboard() {
  const [donor, setDonor] = useState(null);
  const [matchingRequests, setMatchingRequests] = useState([]);

  useEffect(() => {
    const donorData = JSON.parse(localStorage.getItem('donor'));
    if (donorData) {
      setDonor(donorData);
      fetchMatchingRequests(donorData.Blood);
    } else {
      alert("No donor data found. Please log in again.");
    }
  }, []);

  const fetchMatchingRequests = async (bloodType) => {
    try {
      const response = await axios.get(`http://localhost:4000/matching-requests/${bloodType}`);
      // Add 'status' field to each request
      const requestsWithStatus = response.data.map((request) => ({
        ...request,
        status: 'Pending',
      }));
      setMatchingRequests(requestsWithStatus);
    } catch (err) {
      console.error("Error fetching matching requests", err);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setMatchingRequests((prev) =>
      prev.map((request) =>
        request._id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  return (
    <div className="container mt-4">
      {donor ? (
        <>
          <h2>Welcome, {donor.Name}</h2>
          <p><strong>Blood Type:</strong> {donor.Blood}</p>
          <p><strong>Email:</strong> {donor.Email}</p>
          <p><strong>Phone:</strong> {donor.PhoneNumber}</p>

          <h3 className="mt-4">Matching Blood Requests:</h3>
          {matchingRequests.length > 0 ? (
            <ul className="list-group">
              {matchingRequests.map((request) => (
                <li key={request._id} className="list-group-item">
                  <p><strong>Name:</strong> {request.Name}</p>
                  <p><strong>Contact:</strong> {request.PhoneNumber}</p>
                  <p><strong>Blood Needed:</strong> {request.Blood}</p>
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleStatusChange(request._id, 'Accepted')}
                      disabled={request.status === 'Accepted'}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleStatusChange(request._id, 'Declined')}
                      disabled={request.status === 'Declined'}
                    >
                      Decline
                    </Button>
                    <Button
                      variant={
                        request.status === 'Accepted' ? 'success'
                        : request.status === 'Declined' ? 'danger'
                        : 'warning'
                      }
                      size="sm"
                      disabled
                    >
                      {request.status}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No matching requests found</p>
          )}
        </>
      ) : (
        <p>Loading donor data...</p>
      )}
    </div>
  );
}

export default DonorDashboard;
