const mongoose = require("mongoose");
const {Schema} = mongoose;

const CohortSchema = new Schema({
    startingMonth: {
        type: String,
        required: true,
        enum: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    startingDate: {
        type: Date,
        required: true
    },
    endingDate: {
        type: Date,
        required: true
    },
    classType: {
        type: String,
        required: true,
        enum: ["FSJS", "XD"]
    },
    year: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true,
        enum: ["PT", "FT"]
    }
}, {timestamps: true});

module.exports = mongoose.model("Cohorts", CohortSchema);
