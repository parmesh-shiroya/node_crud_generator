const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Role = require('./role.schema.js');




    
// @desc      Get all roles
// @route     GET /api/v1/roles
// @access    Public
exports.getRoles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


    
// @desc      Get single role
// @route     GET /api/v1/roles/:id
// @access    Public
exports.getRole = asyncHandler(async (req, res, next) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    return next(
      new ErrorResponse('Role not found with id of '+req.params.id, 404)
    );
  }

  res.status(200).json({ success: true, data: role });
});


    
// @desc      Create new role
// @route     POST /api/v1/roles
// @access    Public
exports.createRole = asyncHandler(async (req, res, next) => {
 
  const role = await Role.create(req.body);

  res.status(201).json({
    success: true,
    data: role
  });
});


    
// @desc      Update role
// @route     PUT /api/v1/roles/:id
// @access    Public
exports.updateRole = asyncHandler(async (req, res, next) => {
  let role = await Role.findById(req.params.id);

  if (!role) {
    return next(
      new ErrorResponse('Role not found with id of '+req.params.id, 404)
    );
  }

  role = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: role });
});


    
// @desc      Delete role
// @route     DELETE /api/v1/roles/:id
// @access    Public
exports.deleteRole = asyncHandler(async (req, res, next) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    return next(
      new ErrorResponse('Role not found with id of '+req.params.id, 404)
    );
  }


  await role.remove();

  res.status(200).json({ success: true, data: {} });
});

    