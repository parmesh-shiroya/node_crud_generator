const router = require('express').Router();
const advancedResults = require('../../middleware/advancedResults');
const { protect, authorize } = require('../../middleware/auth');
const {
  getBiggests,
  getBiggest,
  createBiggest,
  updateBiggest,
  deleteBiggest
} = require('./Biggest.controller.js');
const Biggest = require('./Biggest.schema.js');



router
  .route('/')
  .get(advancedResults(Biggest), getBiggests)
  .post(createBiggest);

router
  .route('/:id')
  .get(getBiggest)
  .put(updateBiggest)
  .delete(deleteBiggest);


  
module.exports = router;
