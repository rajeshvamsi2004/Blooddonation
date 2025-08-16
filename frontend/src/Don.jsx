import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaHeartbeat, FaEnvelope, FaPhone, FaKey, FaBirthdayCake } from 'react-icons/fa';
import './Donor.css'; 

function Don() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '', Age: '', Blood: '', Email: '', PhoneNumber: ''
  });
  const [otp, setOtp] = useState('');
  const [showOtpBox, setShowOtpBox] = useState(false);
  
  // State for messages with type (success, error, info)
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'

  const [isLoading, setIsLoading] = useState(false);

  const displayMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const loginEmail = localStorage.getItem('Email');
    if (loginEmail !== formData.Email) {
      displayMessage('Error: The email must match the one you used to log in.', 'error');
      return;
    }
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

  const handleVerifyOtpAndSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    displayMessage('Verifying OTP...', 'info');
    try {
      const res = await axios.post('http://localhost:4000/verify-otp', { email: formData.Email, otp });
      if (res.data.message === 'OTP verified successfully') {
        displayMessage('OTP verified. Saving donor details...', 'success');
        await axios.post('http://localhost:4000/donor', formData);
        localStorage.setItem("Blood", formData.Blood);
        localStorage.setItem("donor", JSON.stringify(formData));
        displayMessage('Donor profile created successfully! Redirecting...', 'success');
        setTimeout(() => navigate('/pendings'), 2000);
      } else {
        displayMessage(res.data.message || 'OTP verification failed. Please try again.', 'error');
      }
    } catch (err) {
      displayMessage('An error occurred. Please try again later.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='donor-form-page-wrapper'>
      <div className='donor-form-container'>
        <div className="form-header">
            <h2>Become a Life-Saver</h2>
            <p>Fill out the details below to join our community of donors.</p>
        </div>
        
        {message && <div className={`form-message ${messageType}`}>{message}</div>}

        {!showOtpBox ? (
          <form className='donor-form' onSubmit={handleSendOtp} noValidate>
            <div className="form-input-group">
              <FaUser className="input-icon" />
              <input type="text" name="Name" placeholder="Full Name" value={formData.Name} onChange={handleChange} required />
            </div>
            <div className="form-input-group">
              <FaBirthdayCake className="input-icon" />
              <input type="number" name="Age" placeholder="Age" value={formData.Age} onChange={handleChange} required />
            </div>
            <div className="form-input-group">
                <FaHeartbeat className="input-icon" />
                <select name="Blood" value={formData.Blood} onChange={handleChange} required>
                    <option value="">-- Select Blood Group --</option>
                    <option value="O+">O+</option> <option value="O-">O-</option>
                    <option value="A+">A+</option> <option value="A-">A-</option>
                    <option value="B+">B+</option> <option value="B-">B-</option>
                    <option value="AB+">AB+</option> <option value="AB-">AB-</option>
                </select>
            </div>
            <div className="form-input-group">
              <FaEnvelope className="input-icon" />
              <input type="email" name="Email" placeholder="Email (must match login)" value={formData.Email} onChange={handleChange} required />
            </div>
            <div className="form-input-group">
              <FaPhone className="input-icon" />
              <input type="tel" name="PhoneNumber" placeholder="Phone Number" value={formData.PhoneNumber} onChange={handleChange} required />
            </div>
            <div className="form-full-width">
              <button type="submit" className="form-btn" disabled={isLoading}>{isLoading ? 'Sending...' : 'Get OTP'}</button>
            </div>
          </form>
        ) : (
          <form className='donor-form' onSubmit={handleVerifyOtpAndSave}>
              <div className="form-full-width otp-section">
                  <h4>Verify Your Identity</h4>
                  <p>An OTP has been sent to <strong>{formData.Email}</strong>. Check your inbox.</p>
                  <div className="form-input-group otp-input-group">
                      <FaKey className="input-icon" />
                      <input type="text" placeholder="Enter 6-Digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required maxLength="6" />
                  </div>
                  <button type="submit" className="form-btn" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify & Submit'}</button>
              </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Don;