const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/car", {useNewUrlParser: true});

const carSchema = new Schema({
    carMake: {
        type: String,
        required: true,
        minlength:2
    },
    model: {
        type: String,
        required: true,
        minlength:2
    },
    carYear: {
        type: Number,
        required: true,
        min:2010,
        max:2023
    }
});

module.exports = mongoose.model("car", carSchema);