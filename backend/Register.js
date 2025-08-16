const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const reg = require('./models/Rmodel');
const donor = require('./models/Donor');
const Request = require('./models/Request');
const Bloodbank = require('./models/Bloodbank')
const bloodcamps = require('./models/Bloodcamp');
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors())
require('dotenv').config();[]
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'r87921749@gmail.com',
    pass: 'vxdvzjhqlxcbbzvj' 
  }
});
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
app.get('/', async (req,res)=>{
  res.send("This is first request");
})
app.post('/register',express.json(), async (req,res)=>{
  const {Username,Email,Password} = req.body
  try{
    const ex = await reg.findOne({Email})
    if(ex)
    {
      return res.send("User Existed");
    }
    const newuser = new reg({Username,Email,Password})
    await newuser.save()
    res.send("Registered Successfully")
  }
  catch(error){
    res.send("Registration Unsuccessful")
  }

})
app.post('/login',express.json(), async (req,res)=>{
  const {Email,Password} = req.body 
  try{
    const old = await reg.findOne({Email})
    if(!old)
    {
      return res.send("User Not Found");
    }
    if(old.Password != Password)
    {
      return res.send("Invalid Credentials")
    }
    res.send("Login Successful");
  }
  catch(error){
    res.send("Login Error")
  }
})
app.post('/donor',express.json(), async (req,res)=>{
  const{Name,Age,Blood,Email,PhoneNumber} = req.body  
  try{
    const existed = await donor.findOne({Email})
    if(existed)
    {
      return res.send("User Already Existed")
    }  
    const newdonor = new donor({Name,Age,Blood,Email,PhoneNumber})
    await newdonor.save()
    res.send("Successfully saved in MongoDB");
  }
  catch(error){
    return res.send("Server Error")
  }
})
const otpStore = {}; 

app.post('/send-email', express.json(), async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); 

  otpStore[email] = otp;

  const mailOptions = {
    from: 'r87921749@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).send('Failed to send email');
  }
});
app.post('/verify-otp', express.json(), (req, res) => {
  const { email, otp } = req.body;

  try {
    if (otpStore[email] && otpStore[email].toString() === otp.toString()) {
      delete otpStore[email];
      return res.send({ message: 'OTP verified successfully' });
    }

    return res.status(400).send({ message: 'Invalid or expired OTP' });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).send({ message: 'Server Error' });
  }
});
app.post('/blood-request', express.json(), async (req, res) => {
  try {
    const { Name, Age, Blood, Email, PhoneNumber } = req.body;

    const newRequest = new Request({
      Name,
      Age,
      Blood,
      Email,
      PhoneNumber,
      Status: 'pending',
    });

    await newRequest.save();

    const matchingDonors = await donor.find({ Blood,Email: { $ne: Email } });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'r87921749@gmail.com',
        pass: 'vxdvzjhqlxcbbzvj'
      }
    });

    for (const donorUser of matchingDonors) {
      const mailOptions = {
        from: 'r87921749@gmail.com',
        to: donorUser.Email,
        subject: `🩸 Urgent Blood Request - ${Blood}`,
        text: `
Hello ${donorUser.Name},

A blood request has been made that matches your blood group: ${Blood}.

Patient Details:
- Name: ${Name}
- Age: ${Age}
- Contact Email: ${Email}
- Contact Phone: ${PhoneNumber}

Please respond in the app if you're available to donate.

Thank you for being a life saver! ❤️

~ Blood Donation Management System
        `
      };

      await transporter.sendMail(mailOptions);
    }

    const donorEmails = matchingDonors.map(d => d.Email);

    res.status(201).send({
      message: matchingDonors.length > 0
        ? 'Request created and emails sent to matching donors.'
        : 'Request created, but no matching donors found.',
      request: newRequest,
      matchingDonors: matchingDonors.length,
      donors: donorEmails,
    });

  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).send('Request unable to create');
  }
});


app.get('/blood-requests', async (req, res) => {
  try {
    
    const pendingRequests = await Request.find({Status: "pending"});
    res.status(200).json(pendingRequests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).send('Error fetching requests');
  }
});
app.put('/blood-request/:id',express.json(),async (req,res)=>{
  try{
  const{status} = req.body
  if(!['accepted','rejected'].includes(status))
  {
    return res.status(400).send('Error')
  }
  const updated = await Request.findByIdAndUpdate(req.params.id, {Status: status}, {new: true});
  if(!updated)
  {
     return res.status(400).send("The Request not updated")
  }
  res.status(200).send({message: `Request ${status}`})
  }
  catch(error){
    return res.status(400).send("Catch Error")
  }
})
app.get('/bloodbanks',async (req,res) => {
  res.json()
})
app.get('/status/:id', async (req,res)=>{
  const re = await Request.findOne({Status})
  if(re.Status === 'accepted')
  {
    return res.Statustatus(200).send('The request is accepted')
  }
  else
  {
    return res.status(200).send("There is No Response")
  }
})
app.get('/accepted/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    const requesterEmail = req.query.email;

    if (!requesterEmail) {
      return res.status(400).send({ message: "Requester email is required in query." });
    }

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).send({ message: "Blood request not found." });
    }
    const dbEmail = request.Email?.trim().toLowerCase();
    const queryEmail = requesterEmail.trim().toLowerCase();

    console.log(`🔍 DB Email: [${dbEmail}]`);
    console.log(`🔍 Query Email: [${queryEmail}]`);

    if (dbEmail !== queryEmail) {
      console.log("❌ Email mismatch detected");
      return res.status(403).send({ message: "Access denied. This request was not made by you." });
    }

    if (request.Status === 'accepted') {
      const matchingDonors = await donor.find({ Blood: request.Blood });

      return res.status(200).send({
        message: "Request accepted. Here are the matching donors.",
        status: "accepted",
        donors: matchingDonors
      });
    } else {
      return res.status(200).send({
        message: "Your request is still pending.",
        status: "pending",
        donors: []
      });
    }

  } catch (error) {
    console.error("🔥 Server error in /accepted/:id:", error);
    res.status(500).send({ message: "Internal server error. Please try again later." });
  }
});


app.get('/rejected/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).send({ message: "Request not found" });
    }

    const { Status } = request;

    if (Status === 'rejected') {
      return res.status(200).send({
        message: "Unfortunately, your blood request was rejected.",
        status: Status
      });
    } else {
      return res.status(200).send({
        message: "The request is still pending.",
        status: Status
      });
    }
  } catch (error) {
    console.error("Error in /rejected/:id:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.post('/bank', express.json(), async (req,res)=>{
  try{
    const{State,City,Contact,Blood} = req.body;
    const newBank = new Bloodbank({
      State,City,Contact,Blood
    })
    await newBank.save();
    res.status(201).json({message: "Blood Bank Added Successfully", data : newBank});
  }
  catch(error)
  {
    res.status(404).json({error: "404 found Error"});
  }
})
const fallbackBanks = require('./bloodbanks.json');
const axios = require('axios');

app.get('/gov-bloodbanks', async (req, res) => {
  const { state, district, bloodGroup } = req.query;

  try {
    const response = await axios.get(
      'https://www.eraktkosh.in/BLDAHIMS/bloodbank/transactions/reqBBAvailability.json',
      {
        params: {
          state,
          district,
          bloodGroup
        },
        timeout: 3000 // 3 seconds timeout to prevent long waits
      }
    );

    const banks = response.data?.data || [];
    res.status(200).json({
      message: "Data from Government API",
      data: banks
    });

  } catch (error) {
    console.error('Gov API error:', error.message);

    // Use fallback
    const filteredBanks = fallbackBanks.filter(bank =>
      bank.state === state &&
      bank.district === district &&
      bank.bloodGroupsAvailable.includes(bloodGroup)
    );


    res.status(200).json({
      message: "Government API unavailable. Showing fallback data.",
      data: filteredBanks
    });
  }
});

app.post('/addbloodcamp',express.json(),async (req,res)=>{
  const{Organizer,PhoneNumber,City,Place,Date,Time,} =  req.body;
  try
  {
     const ex = await bloodcamps.findOne({Organizer,City,Date})
     if(ex)
     {
        return res.status(409).send("Blood Camp is already existed");
     }
     const newcamp = new bloodcamps({Organizer,PhoneNumber,City,Place,Date,Time: {Start: Time.Start, End: Time.End}});
     await newcamp.save();
     return res.status(201).send("Blood Camp added Successfully");
     
  }
  catch(error)
  {
    return res.status(404).send("404 Error Forbidden")
  }
})
app.post('/City',express.json(),async (req,res)=>{
  const{City} = req.body;
  try
  {
     const camps = await bloodcamps.find({City})
     if(camps.length == 0)
     {
        return res.status(404).send(`No Blood Camps in The ${City}`);
     }
     res.status(200).json(camps);
  }
  catch(error)
  {
      res.status(500).send("Server Error");
  }
})
app.listen(PORT,(req,res)=>{
  console.log("The Port is Running Successfully")
});