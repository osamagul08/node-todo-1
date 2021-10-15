const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createOne = Model => catchAsync(async (req, res, next) => {
    if (req.file !== undefined) {
      console.log(req.file)
      req.body.photo = req.file.filename;
    }
    const doc = await Model.create(req.body)
    if (!doc) {
        return next(new AppError('data not inserted', 400))
    }  
    res.status(200).json({
        status: "successful",
        data:{
          data: doc
        }
    })
  });

exports.getAll = Model => async(req, res, next) => {
    const docs = await Model.find();
    if (docs) {
    res.status(200).json({
        status: "successful",
        data: docs
    })
    } else {
        res.status(200).json({
            status: 'successful',
            message: "No record exist"
        })
    }
}

exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
    if (!doc) {
      return next(new AppError('Record did not fount', 404))
    }
    res.status(200).json({
      status: "successful",
      data: doc
    })
  });


exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)
    if (!doc) {
      return next(new AppError('Record did not fount', 404))
    }
    res.status(200).json({
      status: "successful"
    })
});

exports.getOne = Model => catchAsync(async (req, res, next) => {
  const doc = await Model.findOne({'_id': req.params.id});
  if (!doc) {
    return next(new AppError('Record did not found invalide `ID`', 404))
  }
  res.status(200).json({
    status: "successful",
    data:{
      doc
    }
  })
});