// Require express router
const router = require('express').Router();
const apiRoutes = require('./api')

router.use('/api', apiRoutes)


// Module exports router
module.exports = router;