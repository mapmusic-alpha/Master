const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const eventSchema = new Schema({

    name: String,
    date: String,
    cost: Number,
    genre: Array,
    artists: Array,
    artistsSpotify: Array,
    openingHours: String,


    location: {

        type: Schema.Types.ObjectId,
        ref: 'Location'

    },

    ageOfEntrance: String

});

const Event = mongoose.model('Event', eventSchema)
module.exports = Event;