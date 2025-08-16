const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import the database connection pool
const dbPool = require('./db');

const app = express();
const PORT = process.env.API_PORT || 3001;

// === Middleware ===
app.use(cors());
app.use(express.json());

// === API Routes ===
app.get('/api/bloodbanks/search', async (req, res) => {
    try {
        const { state, district, city, latitude, longitude, bloodGroup } = req.query;

        let baseQuery = `
            WITH FilteredBloodBanks AS (
                SELECT 
                    bb.*,
                    ${latitude && longitude ? `
                    (6371 * acos(
                        cos(radians(?)) * cos(radians(bb.latitude)) * 
                        cos(radians(bb.longitude) - radians(?)) + 
                        sin(radians(?)) * sin(radians(bb.latitude))
                    )) AS distance` : 'NULL AS distance'}
                FROM bloodbanks bb
                ${bloodGroup ? `
                JOIN blood_inventory bi ON bb.id = bi.bloodbank_id
                WHERE bi.blood_group = ? AND bi.quantity_units > 0
                ` : ''}
            )
            SELECT * FROM FilteredBloodBanks WHERE 1=1
        `;

        const params = [];

        if (latitude && longitude) {
            params.push(latitude, longitude, latitude);
        }
        
        if (bloodGroup) {
            params.push(bloodGroup);
        }

        if (state) {
            baseQuery += ' AND state LIKE ?';
            params.push(`%${state}%`);
        }
        if (district) {
            baseQuery += ' AND district LIKE ?';
            params.push(`%${district}%`);
        }
        if (city) {
            baseQuery += ' AND city LIKE ?';
            params.push(`%${city}%`);
        }

        // --- THE FIX IS HERE ---
        if (latitude && longitude) {
            // CHANGE 1: Reduced the search radius for more local results
            const radiusInKm = 10; 
            // CHANGE 2: Added a LIMIT to show only the most relevant (closest) results
            const resultLimit = 15; 

            baseQuery += ' HAVING distance < ? ORDER BY distance LIMIT ?';
            params.push(radiusInKm, resultLimit);
        } else {
            baseQuery += ' ORDER BY name';
        }
        // --- END OF FIX ---

        const [bloodbanks] = await dbPool.query(baseQuery, params);

        if (bloodbanks.length === 0) {
            return res.status(404).json({ message: 'No blood banks found matching your criteria.' });
        }

        res.status(200).json(bloodbanks);

    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

app.get('/', (req, res) => {
    res.send('Blood Bank Finder API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});