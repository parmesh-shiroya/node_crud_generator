const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('./user.schema.js');




    
// @desc      Get all users
// @route     GET /api/v1/users
// @access    Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


    
// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse('User not found with id of '+req.params.id, 404)
    );
  }

  res.status(200).json({ success: true, data: user });
});


    
// @desc      Create new user
// @route     POST /api/v1/users
// @access    Public
exports.createUser = asyncHandler(async (req, res, next) => {
 
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});


    
// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Public
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse('User not found with id of '+req.params.id, 404)
    );
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: user });
});


    
// @desc      Delete user
// @route     DELETE /api/v1/users/:id
// @access    Public
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse('User not found with id of '+req.params.id, 404)
    );
  }


  await user.remove();

  res.status(200).json({ success: true, data: {} });
});

    