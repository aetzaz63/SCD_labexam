const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    itemname: {  // <-- Correct field name here
        type: String,
        required: true,
        minlength: 3
    },
    itemdescription: {  // <-- Correct field name here
        type: String,
        required: true,
        minlength: 3
    },
    concerntype: {
        type: String,
        enum: ['lost', 'found'],
    },
    images: [{ type: String }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = new mongoose.model("Item", ItemSchema);
