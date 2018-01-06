const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
	"Station ID": String,
	"Station": String,
	"Latitude": Number,
	"Longitude": Number,
	"Station Number": Number
},{timestamps:true});

mongoose.model('Station',StationSchema);