const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const reg = require('./models/Rmodel');
const donor = require('./models/Donor');
const Request = require('./models/Request');
const Bloodbank = require('./models/Bloodbank')
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors())
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'r87921749@gmail.com',
    pass: 'rdju lnsy hhka ucci' 
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

    
    const matchingDonors = await donor.find({ Blood });
     const donorEmails = matchingDonors.map(donor => donor.Email);
    console.log("📢 Request sent to donors with emails:", donorEmails);

    res.status(201).send({
      message: matchingDonors.length > 0
        ? 'Request created and matching donors found.'
        : 'Request created, but no matching donors found.',
      request: newRequest,
      matchingDonors: matchingDonors.length,
      donors: matchingDonors, 
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
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).send({ message: "Request not found" });
    }

    const { Status } = request;

    if (['accepted'].includes(Status)) {
      return res.status(200).send({
        message: `The status is ${Status}`,
        status: Status
      });
    } else {
      return res.status(200).send({
        message: "The request is still pending",
        status: "pending"
      });
    }
  } catch (error) {
    console.error("Error in /notification/:id:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});
app.get('/rejected/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).send({ message: "Request not found" });
    }

    const { Status } = request;

    if (['rejected'].includes(Status)) {
      return res.status(200).send({
        message: `The status is ${Status}`,
        status: Status
      });
    } else {
      return res.status(200).send({
        message: "The request is still pending",
        status: "pending"
      });
    }
  } catch (error) {
    console.error("Error in /notification/:id:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

app.post('/bloodselect',express.json(),async (req,res) => {
  const{State,City} = req.query
  try{
    const filter = {}
    if(State) {
      filter.State = State;
    }
    if(City) {
      filter.City = City;
    }
    const blood = await Bloodbank.find(filter)
    res.json(blood);
  }
  catch(error){
    return res.status(400).send("Error in Blodbanks")
  }
})
app.listen(PORT,(req,res)=>{
  console.log("The Port is Running Successfully")
});