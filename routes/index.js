// Require express router
const router = require('express').Router();


// Import all of the API routes 
const userRoutes = require('./api/user.routes');

// Import all of the API routes 
const thoughtRoutes = require('./api/thought-routes');

// add prefix of `/api` to all of the api routes
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

// Module exports router
module.exports = router;