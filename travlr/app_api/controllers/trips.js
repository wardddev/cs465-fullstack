const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
    try {
        // Extract sorting parameters from the query string
        const sortBy = req.query.sortBy || 'name'; // Default, sorts by name
        const sortDirection = req.query.sortDirection === 'desc' ? -1 : 1; // Default, ascending order

        // Fetch trips with sorting
        const trips = await Model
            .find({})
            .sort({ [sortBy]: sortDirection })
            .exec();

        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }

        res.status(200).json(trips);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching trips' });
    }
};

// GET: /trips/:tripCode - lists a single trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // Return a single record
        .exec();

    // Uncomment the following line to show results
    // of the query on the console
    // console.log(q);

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }

};

// POST: /trips - Add a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

    if(!q)
    { // Database returned no data
        return res
                .status(400)
                .json(err);
    } else { // Return new trip
        return res
            .status(201)
            .json(q);
    }

    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
};

// PUT: /trips/:tripCode - Updates a Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    // Uncomment for debugging
    // console.log(req.params);
    // console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            }
        )
        .exec();

        if(!q)
        { // Database returned no data
            return res
                    .status(400)
                    .json(err);
        } else { // Return updated trip
            return res
                .status(201)
                .json(q);
        }

        // Uncomment the following line to show results of operation
        // on the console
        // console.log(q);
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};