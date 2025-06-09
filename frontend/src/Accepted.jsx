import React, { useEffect, useState } from 'react';

const RequestStatus = () => {
  const [statusMessage, setStatusMessage] = useState('Loading...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestId = localStorage.getItem('requestId');

    if (!requestId) {
      setError('No request ID found. Please submit a blood request first.');
      return;
    }

    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:4000/accepted/${requestId}`);
        const data = await res.json();

        if (res.ok) {
          setStatusMessage(data.message);
        } else {
          setStatusMessage('Status not found');
        }
      } catch (err) {
        setError('Error fetching request status');
      }
    };

    fetchStatus();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Blood Request Status</h2>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <p>{statusMessage}</p>}
    </div>
  );
};

export default RequestStatus;
