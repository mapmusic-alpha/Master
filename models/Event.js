const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const eventSchema = new Schema({

    name: String,
    date: String,
    cost: Number,
    genre: Array,
    artists: Array,
    openingHours: String,
    // ticketsAvailable:??


    location: {

        type: Schema.Types.ObjectId,
        ref: 'Location'

    },

    ageOfEntrance: {

        type: String,
        enum: ['Eighteen + ', 'Twenty One +'],
        default: 'Eighteen +'

    }

});

const Event = mongoose.model('Event', eventSchema)
module.exports = Event;