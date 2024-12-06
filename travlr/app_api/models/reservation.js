const mongoose = require('mongoose');

// Define the reservation schema
const reservationSchema = new mongoose.Schema({
    email: { type: String, required: true, index: true },
    trip: { type: String, required: true, index: true },
    guests: { type: Number, required: true },
});

const Reservation = mongoose.model('reservations', reservationSchema);
module.exports = Reservation;