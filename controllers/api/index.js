const router = require('express').Router();

const userRoutes = require('./user-routes');
const petRoutes = require('./pet-routes');
const caredayRoutes = require('./careday-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const fileRoutes = require('./file-routes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes); 
router.use('/caredays', caredayRoutes); 
router.use('/posts', postRoutes); 
router.use('/comments', commentRoutes); 
router.use('/files', fileRoutes); 

module.exports = router;