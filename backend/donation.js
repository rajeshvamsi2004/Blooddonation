const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 5003;

// Enable CORS so frontend can connect
app.use(cors({
  origin: "http://localhost:3000", // allow your React app's origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// =========================
// MySQL Connection Function
// =========================
let db;
function handleDisconnect() {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rajeshvamsi143", // Note: It's recommended to use environment variables for credentials
    database: "donation"
  });

  db.connect(err => {
    if (err) {
      console.error("❌ MySQL connection error:", err.message);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("✅ MySQL Connected...");
    }
  });

  db.on("error", err => {
    console.error("❌ MySQL error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

// =========================
// Search Route (Corrected)
// =========================
app.get('/search', (req, res) => {
    let location = (req.query.location || '').trim();
    let bloodGroup = (req.query.blood_group || '').trim();

    // If '+' got turned into a space in the URL, change it back
    bloodGroup = bloodGroup.replace(' ', '+');

    // CORRECTED QUERY: Use subqueries to count everything independently
    const query = `
        SELECT
            (SELECT COUNT(donor_id) 
             FROM donors 
             WHERE location = ? AND blood_group = ?) AS donors,
            
            (SELECT COUNT(bank_id) 
             FROM blood_banks 
             WHERE location = ?) AS blood_banks,
            
            (SELECT COALESCE(SUM(bi.units), 0) 
             FROM blood_stock bi
             JOIN blood_banks bb ON bi.bank_id = bb.bank_id
             WHERE bb.location = ? AND bi.blood_group = ?) AS total_units
    `;
    
    // The parameters must be passed in the correct order for the subqueries
    const queryParams = [
        location, bloodGroup, // For donors subquery
        location,             // For blood_banks subquery
        location, bloodGroup  // For total_units subquery
    ];

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({
            location,
            blood_group: bloodGroup,
            donors: results[0].donors,
            blood_banks: results[0].blood_banks,
            total_units: results[0].total_units
        });
    });
});

// =========================
// Start Server
// =========================
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});