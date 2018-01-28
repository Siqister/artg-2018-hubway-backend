const router = require('express').Router();
const mongoose = require('mongoose');
const Station = mongoose.model('Station');

router.get('/',(req,res,next)=>{

	return Promise.all([
			Station.find({}),
			Station.count({}).exec()
		]).then(([stations,count]) =>
			res.json({
				count:count,
				stations:stations.map(x => x.toJSON())
			})
		).catch(next);

});

module.exports = router;