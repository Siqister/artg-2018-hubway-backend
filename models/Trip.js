const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
	"tripduration" : Number,
	//"starttime" : Number, //ought to be date
	//"stoptime" : Number,
	"start station id" : {type:Number, default:0},
	"start station name" : String,
	"start station latitude" : Number,
	"start station longitude" : Number,
	"end station id" : {type:Number, default:0},
	"end station name" : String,
	"end station latitude" : Number,
	"end station longitude" : Number,
	"bikeid" : Number,
	"usertype" : Number,
	"birth year" : Number,
	"gender" : Number
},{timestamps:true});

mongoose.model('Trip',TripSchema);