const { v4: uuidv4 } = require('uuid');

function generateRandomBookingId() {
    return uuidv4();
}

module.exports = generateRandomBookingId;
