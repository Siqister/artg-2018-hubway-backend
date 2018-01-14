const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
	"tripduration" : Number,
	"starttime" : Date,
	"stoptime" : Date,
	"start_station_id" : String,
	"start_station_name" : String,
	"start_station_latitude" : Number,
	"start_station_longitude" : Number,
	"end_station_id" : String,
	"end_station_name" : String,
	"end_station_latitude" : Number,
	"end_station_longitude" : Number,
	"bikeid" : Number,
	"usertype" : Number,
	"birth year" : Number,
	"gender" : Number
},{timestamps:true},{collection:'trips'});

TripSchema.methods.toJSON = function(){
	return {
		duration:this.tripduration,
		station0:this['start_station_id'],
		station1:this['end_station_id'],
		bike_nr:this.bikeid,
		t0:this.starttime,
		t1:this.stoptime
	}
}

mongoose.model('Trip',TripSchema);