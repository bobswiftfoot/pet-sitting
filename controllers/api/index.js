const router = require('express').Router();

const userRoutes = require('./user-routes');
const petRoutes = require('./pet-routes');
const caredayRoutes = require('./careday-routes');
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes); 
router.use('/caredays', caredayRoutes); 
router.use('/posts', postRoutes); 

module.exports = router;