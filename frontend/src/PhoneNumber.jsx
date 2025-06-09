import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase"; 

const OTPLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [user, setUser] = useState(null);

  const sendOtp = async () => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
          size: "invisible", // 👈 Makes reCAPTCHA invisible
        });
      }

      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      alert("OTP Sent!");
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      alert("Failed to send OTP. Check the phone number.");
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      setUser(result.user);
      alert("OTP Verified!");
    } catch (error) {
      console.error("Invalid OTP", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Phone OTP Verification</h2>
      {!user ? (
        <>
          <input
            type="text"
            placeholder="Enter phone number (+1XXXXXXXXXX)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ padding: "10px", margin: "10px", width: "250px" }}
          />
          <button onClick={sendOtp} id="sign-in-button" style={{ padding: "10px", cursor: "pointer" }}>Send OTP</button>

          {confirmationResult && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ padding: "10px", margin: "10px", width: "250px" }}
              />
              <button onClick={verifyOtp} style={{ padding: "10px", cursor: "pointer" }}>Verify OTP</button>
            </>
          )}
        </>
      ) : (
        <h3>OTP Verified Successfully! 🎉</h3>
      )}
    </div>
  );
};

export default OTPLogin;
