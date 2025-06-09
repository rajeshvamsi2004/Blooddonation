import React from "react";

const Donor = () => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100px", 
      background: "blue"
    }}>
      <div style={{
        width: "90%",
        maxWidth: "400px",
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <form style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "15px" 
        }}>
          <label style={{color: "black", marginLeft: "-250px", fontFamily: "sans-serif", fontSize: "12px"}} htmlFor="email">Enter Your Email :</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Email"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "300px",
              fontFamily: "sans-serif",
              fontSize: "12px",
              border: "2px solid black"
            }}
          />

          <label style={{color: "black", marginLeft: "-200px", fontFamily: "sans-serif", fontSize: "12px"}} htmlFor="phone">Enter Your Phone Number :</label>
          <input 
            type="tel" 
            id="phone" 
            placeholder="Phone Number"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "300px",
              fontFamily: "sans-serif",
              fontSize: "12px",
              border: "2px solid black"
            }}
          />

          {/* Submit Button */}
          <button 
            type="submit"
            style={{
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.3s",
              width: "150px",
              height: "40px",
              marginLeft: "80px"
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donor;
