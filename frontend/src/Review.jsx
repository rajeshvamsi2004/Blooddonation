import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Review = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorBlood, setDonorBlood] = useState('');
  useEffect(() => {
    const email = localStorage.getItem('Email');
    const blood = localStorage.getItem('Blood');

    if (!email || !blood) {
      console.log('⚠️ Donor info missing in localStorage!');
      setMessage('Donor info is missing. Please log in first.');
      return;
    }

    console.log('Loaded from localStorage:', email, blood);

    setDonorEmail(email);
    setDonorBlood(blood);
  }, []);
  useEffect(() => {
    if (donorEmail && donorBlood) {
      fetchPendingRequests(donorEmail, donorBlood);
    }
  }, [donorEmail, donorBlood]);

  const fetchPendingRequests = async (email, blood) => {
    try {
      const res = await axios.get('http://localhost:4000/blood-requests');

      console.log('Backend Response:', res.data);
      console.log('Current Donor Email:', email);
      console.log('Current Donor Blood:', blood);

      const pending = res.data.filter((req) => {
        console.log('Checking request:', req);
        return (
          req.Status === 'pending' &&
          req.Blood === blood &&
          req.Email !== email 
        );
      });

      console.log('Filtered Requests:', pending);
      setRequests(pending);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setMessage('Failed to load requests');
    }
  };

  const handleResponse = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:4000/blood-request/${id}`, {
        status,
      });

      setMessage(res.data.message);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (error) {
      console.error('Error updating request:', error);
      setMessage('Failed to update request');
    }
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      {message && <p>{message}</p>}
      {requests.length === 0 ? (
        <p>No matching pending requests.</p>
      ) : (
        requests.map((val, index) => (
          <div className='reviewrequests' key={index}>
            <p>Name: {val.Name}</p>
            <p>Age: {val.Age}</p>
            <p>Blood Group: {val.Blood}</p>
            <p>Phone Number: {val.PhoneNumber}</p>
            <button
              style={{ backgroundColor: 'green', border: 'none' }}
              onClick={() => handleResponse(val._id, 'accepted')}
            >
              Accepted
            </button>
            <button
              style={{ backgroundColor: 'red', border: 'none' }}
              onClick={() => handleResponse(val._id, 'rejected')}
            >
              Rejected
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Review;
