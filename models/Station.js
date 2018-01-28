const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
	"Station ID": String,
	"Station": String,
	"Latitude": Number,
	"Longitude": Number,
	"Station Number": Number
},{timestamps:true},{collection:'stations'});

StationSchema.methods.toJSON = function(){
	return {
		id_short:this['Station Number'],
		id_long:this['Station ID'],
		lng:this.Longitude,
		lat:this.Latitude,
		name:this.Station
	}
}

mongoose.model('Station',StationSchema);