const tripsEndpoint = process.env.TRIPS_API_ENDPOINT || 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

/* Fetch Trips from API with Sorting */
const fetchTrips = async (sortBy = 'name', sortDirection = 'asc') => {
    const response = await fetch(`${tripsEndpoint}?sortBy=${sortBy}&sortDirection=${sortDirection}`, options);
    if (!response.ok) {
        throw new Error(`Failed to fetch trips: ${response.status} ${response.statusText}`);
    }
    return await response.json();
};

/* GET Travel view with Sorting */
const travel = async function(req, res, next) {
    try {
        const sortBy = req.query.sortBy || 'name'; // Default to sorting by name
        const sortDirection = req.query.sortDirection || 'asc'; // Default to ascending order

        const trips = await fetchTrips(sortBy, sortDirection);
        let message = null;

        if (!(trips instanceof Array)) {
            message = 'API lookup error';
        } else if (!trips.length) {
            message = 'No trips exist in our database!';
        }

        res.render('travel', {
            title: 'Travlr Getaways',
            trips: trips || [],
            message,
            sortBy,
            sortDirection
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
