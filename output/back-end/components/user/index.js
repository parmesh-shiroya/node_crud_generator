const router = require('express').Router();
const advancedResults = require('../../middleware/advancedResults');
const { protect, authorize } = require('../../middleware/auth');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('./User.controller.js');
const User = require('./User.schema.js');



router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);


  
module.exports = router;
