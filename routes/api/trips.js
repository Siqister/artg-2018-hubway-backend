const router = require('express').Router();
const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

router.get('/', (req,res,next) => {

	res.json({
		message:'Hello world'
	});

});

module.exports = router;