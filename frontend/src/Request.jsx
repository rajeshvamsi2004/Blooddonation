import React,{useState} from 'react'
import axios from 'axios'
import './Main.css'
const Request = () => {
  const [Name, setName] = useState('');
    const [Age, setAge] = useState('');
    const [Blood, setBlood] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [message, setMessage] = useState('');
  
    const handleSendOtp = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:4000/send-email', { email: Email });
        setMessage(res.data.message || 'OTP sent to email');
        setShowOtpBox(true);
      } catch (err) {
        console.error(err);
        setMessage('Failed to send OTP');
      }
    };
  
    const handleVerifyOtp = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:4000/verify-otp', { email: Email, otp });
        if (res.data.message === 'OTP verified successfully') {
          setMessage('OTP verified. Saving Request ...');
          await saveDonor();
        } else {
          setMessage(res.data.message || 'OTP verification failed');
        }
      } catch (err) {
        console.error(err);
        setMessage('OTP verification failed');
      }
    };
  
    const saveDonor = async () => {
  try {
    const donorData = { Name, Age, Blood, Email, PhoneNumber };
    const res = await axios.post('http://localhost:4000/blood-request', donorData);

    if (res.data.request && res.data.request._id) {
      // Store request ID in localStorage
      localStorage.setItem('requestId', res.data.request._id);
    }

    setMessage(res.data.message || 'Blood Request saved successfully');
  } catch (err) {
    console.error(err);
    setMessage('Failed to save donor');
  }
};

  
  return (
    <div id='donor1' style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2 style={{position: 'absolute',textAlign: 'center', marginTop: '-50px', marginLeft: '120px'}}>Blood Request</h2>
      <form id='donorform' onSubmit={handleSendOtp}>
        <input type="text" placeholder="Name" value={Name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Age" value={Age} onChange={(e) => setAge(e.target.value)} required />
         <select id='donorselect' value={Blood} onChange={(e) => setBlood(e.target.value)} required>
          <option value="">-- Select Blood Group To Request --</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select><br /> 
        <input type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Phone Number" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <button id='donorbut' type="submit">Send OTP</button>
      </form>

      {showOtpBox && (
        <form id='donor2form' onSubmit={handleVerifyOtp}>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      <p style={{position: 'absolute', marginTop: '15px', color: 'green', marginLeft: '135px'}}>{message}</p>
    </div>
  );
}
  


export default Request 
