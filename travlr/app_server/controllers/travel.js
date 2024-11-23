const tripsEndpoint = process.env.TRIPS_API_ENDPOINT || 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

/* Fetch Trips from API */
const fetchTrips = async () => {
    const response = await fetch(tripsEndpoint, options);
    if (!response.ok) {
        throw new Error(`Failed to fetch trips: ${response.status} ${response.statusText}`);
    }
    return await response.json();
};

/* GET Travel view */
const travel = async function(req, res, next) {
    try {
        const trips = await fetchTrips();
        let message = null;

        if (!(trips instanceof Array)) {
            message = 'API lookup error';
        } else if (!trips.length) {
            message = 'No trips exist in our database!';
        }

        res.render('travel', {
            title: 'Travlr Getaways',
            trips: trips || [],
            message
        });
    } catch (err) {
        console.error('Error fetching trips:', err.message);
        res.status(500).render('travel', {
            title: 'Travlr Getaways',
            trips: [],
            message: 'An error occurred while fetching trips. Please try again later.'
        });
    }
};

module.exports = {
    travel
};
