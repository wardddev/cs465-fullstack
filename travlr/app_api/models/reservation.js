const mongoose = require('mongoose');

// Define the reservation schema
const reservationSchema = new mongoose.Schema({
    email: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    qtyPerson: { type: Number, required: true },
});

const Reservation = mongoose.model('reservations', reservationSchema);
module.exports = Reservation;