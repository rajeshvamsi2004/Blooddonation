import React, { useState } from 'react';
function AddBloodCamp() {
  const [Organizer, setOrganizer] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [City, setCity] = useState('');
  const [Place, setPlace] = useState('');
  const [Date, setDate] = useState('');
  const [StartTime, setStartTime] = useState('');
  const [EndTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    const data = {
      Organizer: Organizer,
      PhoneNumber: PhoneNumber,
      City: City,
      Place: Place,
      Date: Date,
      Time: {
        Start: StartTime,
        End: EndTime
      }
    };

    try {
      const response = await fetch('http://localhost:4000/addbloodcamp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.status === 201) {
        setMessage("Blood Camp added successfully");
      } else if (response.status === 409) {
        setMessage("Blood Camp already exists");
      } else {
        setMessage("Something went wrong");
      }
    } catch (error) {
      setMessage("Error while sending request");
    }
  };

  return (
    <div>
      <h2 style={{marginTop: '10px', fontFamily: 'sans-serif', fontSize: '25px'}}>Add Blood Camp</h2>
      <form className='Bloodcampdiv' onSubmit={submitForm}>
        <input type="text" placeholder="Organizer" value={Organizer} onChange={(e) => setOrganizer(e.target.value)} required /><br />
        <input type="text" placeholder="Phone Number" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required /><br />
        <input type="text" placeholder="City" value={City} onChange={(e) => setCity(e.target.value)} required /><br />
        <input type="text" placeholder="Place" value={Place} onChange={(e) => setPlace(e.target.value)} required /><br />
        <input type="date" value={Date} onChange={(e) => setDate(e.target.value)} required /><br />
        <label>Start Time:</label>
        <input type="time" value={StartTime} onChange={(e) => setStartTime(e.target.value)} required /><br />
        <label>End Time:</label>
        <input type="time" value={EndTime} onChange={(e) => setEndTime(e.target.value)} required /><br /><br />
        <button className='bloodcampbutton' type="submit">Add Camp</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddBloodCamp;
