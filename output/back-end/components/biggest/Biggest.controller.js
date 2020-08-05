const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Biggest = require('./biggest.schema.js');




    
// @desc      Get all biggests
// @route     GET /api/v1/biggests
// @access    Public
exports.getBiggests = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


    
// @desc      Get single biggest
// @route     GET /api/v1/biggests/:id
// @access    Public
exports.getBiggest = asyncHandler(async (req, res, next) => {
  const biggest = await Biggest.findById(req.params.id);

  if (!biggest) {
    return next(
      new ErrorResponse('Biggest not found with id of '+req.params.id, 404)
    );
  }

  res.status(200).json({ success: true, data: biggest });
});


    
// @desc      Create new biggest
// @route     POST /api/v1/biggests
// @access    Public
exports.createBiggest = asyncHandler(async (req, res, next) => {
 
  const biggest = await Biggest.create(req.body);

  res.status(201).json({
    success: true,
    data: biggest
  });
});


    
// @desc      Update biggest
// @route     PUT /api/v1/biggests/:id
// @access    Public
exports.updateBiggest = asyncHandler(async (req, res, next) => {
  let biggest = await Biggest.findById(req.params.id);

  if (!biggest) {
    return next(
      new ErrorResponse('Biggest not found with id of '+req.params.id, 404)
    );
  }

  biggest = await Biggest.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: biggest });
});


    
// @desc      Delete biggest
// @route     DELETE /api/v1/biggests/:id
// @access    Public
exports.deleteBiggest = asyncHandler(async (req, res, next) => {
  const biggest = await Biggest.findById(req.params.id);

  if (!biggest) {
    return next(
      new ErrorResponse('Biggest not found with id of '+req.params.id, 404)
    );
  }


  await biggest.remove();

  res.status(200).json({ success: true, data: {} });
});

    