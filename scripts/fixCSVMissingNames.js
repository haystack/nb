const fs = require('fs');
const csv = require('csv-parser');
const stripBomStream = require('strip-bom-stream');
const User = require('../models').User

const CSV_FILE = 'names.csv'

// Read CSV file and update database
fs.createReadStream(CSV_FILE)
.pipe(stripBomStream()) // Remove Byte Order Marks (BOM) that might be present in some CSV format files such as Excel
.pipe(csv())
.on('data', async (row) => {
    const { First, Last, Email } = row;
    
    if (Email) {
        // Find user by email
        const user = await User.findOne({
            where: { email: Email }
        });
        
        // Update name if user exists and name is null
        if (user && user.first_name === null  && user.last_name === null) {
            console.log(`Updating: ${Email}`);
            await user.update({ first_name: First, last_name: Last });
        }
    }
    
})
.on('end', () => {
    console.log('CSV file processed');
})