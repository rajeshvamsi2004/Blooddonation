import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaHeartbeat, FaEnvelope, FaPhone, FaKey, FaBirthdayCake } from 'react-icons/fa';
import './App.css'; // Uses the same CSS as the Don component

const Request = () => {
  // Consolidate form state into a single object for easier management
  const [formData, setFormData] = useState({
    Name: '', Age: '', Blood: '', Email: '', PhoneNumber: ''
  });
  
  const [otp, setOtp] = useState('');
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use state for message content and type (success, error, info)
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Helper function to display messages
  const displayMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
  };

  // Single handler for all form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    displayMessage('Sending OTP, please wait...', 'info');
    try {
      await axios.post('http://localhost:4000/send-email', { email: formData.Email });
      displayMessage('OTP sent successfully to your email.', 'success');
      setShowOtpBox(true);
    } catch (err) {
      displayMessage('Failed to send OTP. Please check the email and try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    displayMessage('Verifying OTP...', 'info');
    try {
      const res = await axios.post('http://localhost:4000/verify-otp', { email: formData.Email, otp });
      if (res.data.message === 'OTP verified successfully') {
        displayMessage('OTP verified. Saving your request...', 'success');
        await saveRequest();
      } else {
        displayMessage(res.data.message || 'OTP verification failed. Please try again.', 'error');
      }
    } catch (err) {
      displayMessage('An error occurred during verification. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const saveRequest = async () => {
    try {
      const res = await axios.post('http://localhost:4000/blood-request', formData);
      if (res.data.request && res.data.request._id) {
        localStorage.setItem('requestId', res.data.request._id);
        localStorage.setItem('Email', formData.Email);
      }
      displayMessage(res.data.message || 'Blood Request submitted successfully!', 'success');
    } catch (err) {
      displayMessage('Failed to submit your request. Please try again later.', 'error');
    }
  };

  return (
    // Reusing the same wrapper and container classes for a consistent look
    <div className='donor-form-page-wrapper'>
      <div className='donor-form-container'>
        <div className="form-header">
            <h2>Request for Blood</h2>
            <p>Fill out the form below to post a blood request.</p>
        </div>

        {message && <div className={`form-message ${messageType}`}>{message}</div>}

        {!showOtpBox ? (
          <form className='donor-form' onSubmit={handleSendOtp} noValidate>
            <div className="form-input-group">
                <FaUser className="input-icon" />
                <input type="text" name="Name" placeholder="Patient's Full Name" value={formData.Name} onChange={handleChange} required />
            </div>
            <div className="form-input-group">
                <FaBirthdayCake className="input-icon" />
                <input type="number" name="Age" placeholder="Patient's Age" value={formData.Age} onChange={handleChange} required />
            </div>
            <div className="form-input-group">
                <FaHeartbeat className="input-icon" />
                <select name="Blood" value={formData.Blood} onChange={handleChange} required>
                    <option value="">-- Blood Group Needed --</option>
                    <option value="O+">O+</option> <option value="O-">O-</option>
                    <option value="A+">A+</option> <option value="A-">A-</option>
                    <option value="B+">B+</option> <option value="B-">B-</option>
                    <option value="AB+">AB+</option> <option value="AB-">AB-</option>
                </select>
            </div>
            <div className="form-input-group">
                <FaEnvelope className="input-icon" />
                <input type="email" name="Email" placeholder="Your Contact Email" value={formData.Email} onChange={handleChange} required />
            </div>
            <div className="form-input-group">
                <FaPhone className="input-icon" />
                <input type="tel" name="PhoneNumber" placeholder="Your Contact Phone" value={formData.PhoneNumber} onChange={handleChange} required />
            </div>
            <div className="form-full-width">
                <button type="submit" className="form-btn" disabled={isLoading}>{isLoading ? 'Sending...' : 'Send OTP for Verification'}</button>
            </div>
          </form>
        ) : (
          <form className='donor-form' onSubmit={handleVerifyOtp}>
              <div className="form-full-width otp-section">
                  <h4>Verify Your Contact Email</h4>
                  <p>An OTP has been sent to <strong>{formData.Email}</strong>. Please enter it to proceed.</p>
                  <div className="form-input-group otp-input-group">
                      <FaKey className="input-icon" />
                      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength="6" />
                  </div>
                  <button type="submit" className="form-btn" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify & Submit Request'}</button>
              </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Request;