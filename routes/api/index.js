const router = require('express').Router();

router.use('/trips', require('./trips'));
router.use('/stations', require('./stations'));

module.exports = router;