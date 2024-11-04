var fs = require('fs');
var rooms = JSON.parse(fs.readFileSync('./data/rooms.json','utf8'));

/* GET Rooms view */
const room = (req, res) => {
    // Renders rooms view and sends rendered HTML string to client
    res.render('rooms', { title: 'Travlr Getaways', rooms});
};

module.exports = {
    room
}