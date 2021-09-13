const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const locationSchema = new Schema(
    {

        name: String,
        description: String,
        coordinates: Array,
        logo: URL,
        nearestStation: {

            name: String,
            distance: String,
            availableLines: Array
        }

    }
);

const Location = mongoose.model('Location', locationSchema)

module.exports = Location


