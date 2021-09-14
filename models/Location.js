const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const locationSchema = new Schema(
    {

        name: String,
        description: String,
        coordinates: Array,
        //URL is better 
        logo: String,
        nearestStation: {

            name: String,
            distance: String,
            availableLines: Array
        }

    }
);

const Location = mongoose.model('Location', locationSchema)

module.exports = Location


