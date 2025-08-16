import React, { useEffect, useState } from 'react';


const Accepted = () => {
  const [statusMessage, setStatusMessage] = useState('Loading...');
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestId = localStorage.getItem('requestId');
    const email = localStorage.getItem('Email');

    if (!requestId || !email) {
      setError('Missing request ID or login email');
      return;
    }

    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:4000/accepted/${requestId}?email=${email}`);
        const data = await res.json();

        if (res.ok) {
          setStatusMessage(data.message);
          if (data.donors) {
            setDonors(data.donors);
          }
        } else {
          setStatusMessage(data.message || 'Status not found');
        }
      } catch (err) {
        setError('Error fetching request status');
      }
    };

    fetchStatus();
  }, []);

  return (
    <div className="container mt-4" style={{ fontSize: '12px' }}>
      <h2 style={{ fontFamily: 'sans-serif', fontSize: '25px' }} className="text-center mb-3">
        Blood Request Status
      </h2>
      
      {error ? (
        <div className="text-danger text-center">{error}</div>
      ) : (
        <>
          {donors.length > 0 && (
            <>
              <h4 style={{ fontSize: '20px', fontFamily: 'sans-serif' }} className="text-center mb-3">
                Accepted Donors
              </h4>
              <div className="d-flex flex-column gap-3">
                {donors.map((donor, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center border rounded p-3"
                    style={{
                      backgroundColor: '#d4edda',
                      color: '#155724',
                      fontSize: '12px',
                      flexWrap: 'wrap',
                      fontFamily: 'sans-serif'
                    }}
                  >
                    <div><strong>Name:</strong> {donor.Name}</div>
                    <div><strong>Email:</strong> {donor.Email}</div>
                    <div><strong>Phone:</strong> {donor.PhoneNumber}</div>
                    <div>
                      <strong>Status:</strong>{' '}
                      <span style={{ color: 'green', fontWeight: 'bold' }}>
                        Accepted
                        <span
                          style={{
                            display: 'inline-block',
                            marginLeft: '6px',
                            backgroundColor: 'green',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px 6px',
                            fontSize: '10px',
                            verticalAlign: 'middle'
                          }}
                        >
                          ✔
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Accepted;
