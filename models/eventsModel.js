const mongoose = require("mongoose");
const schema = mongoose.Schema;
const eventsSchema = new schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    imagesPath: {
        type: String,
    },
    category: {
        type: String,
    },
    location: {
        type: String,
    },
    venue: {
        type: String,
    },
    start: {
        type: Date,
    },
    time: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now,
        once: true
    },
    updated: {
        type: Date,
        default: Date.now,

    }
});
const eventsModel = mongoose.model('events', eventsSchema);
module.exports = eventsModel;