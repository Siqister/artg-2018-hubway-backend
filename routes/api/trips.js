const router = require('express').Router();
const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

router.get('/', (req,res,next) => {

	const query = {};
	const stop1 = req.query.stop1;
	const stop2 = req.query.stop2;
	const t0 = req.query.t0;
	const t1 = req.query.t1;

	//Query by stops
	if(stop1 && stop2){
		query.$or = [
			{start_station_id:String(stop1), end_station_id:String(stop2)},
			{start_station_id:String(stop2), end_station_id:String(stop1)}
		];
	}else if(stop1){
		query.$or = [
			{start_station_id: String(stop1)},
			{end_station_id: String(stop1)}
		];
	}

	//Query by date
	if(t0){
		query.starttime = {$gte:new Date(+t0)};
	}
	if(t1){
		query.stoptime = {$lte:new Date(+t1)};
	}

	return Promise.all([
			Trip.find(query),
			Trip.count(query).exec()
		]).then(([trips,count]) =>
			res.json({
				count:count,
				trips:trips.map(x => x.toJSON())
			})
		).catch(next);

});

module.exports = router;