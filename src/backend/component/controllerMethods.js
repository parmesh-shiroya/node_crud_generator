// componentsName_name = bootcamps
// component_name = bootcamp
// ComponentsName_name = Bootcamps
// Component_name = Bootcamp
// ModelName = Bootcamp

exports.getFunction = `
// @desc      Get all {{componentsName}}
// @route     GET /api/v1/{{componentsName}}
// @access    Public
exports.get{{ComponentsName}} = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
`


exports.getOneFunction = `
// @desc      Get single {{componentName}}
// @route     GET /api/v1/{{componentsName}}/:id
// @access    Public
exports.get{{ComponentName}} = asyncHandler(async (req, res, next) => {
  const {{componentName}} = await {{ModelName}}.findById(req.params.id);

  if (!{{componentName}}) {
    return next(
      new ErrorResponse('{{ComponentName}} not found with id of '+req.params.id, 404)
    );
  }

  res.status(200).json({ success: true, data: {{componentName}} });
});
`


exports.createFunction = `
// @desc      Create new {{componentName}}
// @route     POST /api/v1/{{componentsName}}
// @access    Public
exports.create{{ComponentName}} = asyncHandler(async (req, res, next) => {
 
  const {{componentName}} = await {{ModelName}}.create(req.body);

  res.status(201).json({
    success: true,
    data: {{componentName}}
  });
});
`


exports.updateFunction = `
// @desc      Update {{componentName}}
// @route     PUT /api/v1/{{componentsName}}/:id
// @access    Public
exports.update{{ComponentName}} = asyncHandler(async (req, res, next) => {
  let {{componentName}} = await {{ModelName}}.findById(req.params.id);

  if (!{{componentName}}) {
    return next(
      new ErrorResponse('{{ComponentName}} not found with id of '+req.params.id, 404)
    );
  }

  {{componentName}} = await {{ModelName}}.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: {{componentName}} });
});
`


exports.deleteFunction = `
// @desc      Delete {{componentName}}
// @route     DELETE /api/v1/{{componentsName}}/:id
// @access    Public
exports.delete{{ComponentName}} = asyncHandler(async (req, res, next) => {
  const {{componentName}} = await {{ModelName}}.findById(req.params.id);

  if (!{{componentName}}) {
    return next(
      new ErrorResponse('{{ComponentName}} not found with id of '+req.params.id, 404)
    );
  }


  await {{componentName}}.remove();

  res.status(200).json({ success: true, data: {} });
});
`