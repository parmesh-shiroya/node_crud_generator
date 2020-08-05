const router = require('express').Router();
const advancedResults = require('../../middleware/advancedResults');
const { protect, authorize } = require('../../middleware/auth');
const {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole
} = require('./Role.controller.js');
const Role = require('./Role.schema.js');



router
  .route('/')
  .get(advancedResults(Role), getRoles)
  .post(createRole);

router
  .route('/:id')
  .get(getRole)
  .put(updateRole)
  .delete(deleteRole);


  
module.exports = router;
