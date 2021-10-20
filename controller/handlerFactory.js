const fs = require('fs')

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const helperResponse = require('../utils/helperResponse')

exports.createOne = Model => catchAsync(async (req, res, next) => {
    if (req.file !== undefined) {
      req.body.photo = req.file.filename;
    }
    const doc = await Model.create(req.body)
    if (!doc) {
        return next(new AppError('data not inserted', 400))
    }
    helperResponse.response(res, "successful", 200, doc);
  
  });

exports.getAll = Model => async(req, res, next) => {
    const page = req.query.page*1 || 1;
    const limit = req.query.limit *1 || 100;
    const skip = (page - 1)*limit;
    const totalDoc = await Model.countDocuments();
    const docs = await Model.find().skip(skip).limit(limit);
    if (docs) {
      helperResponse.response(res, "successful", 200, docs, totalDoc);
    } else {
        res.status(200).json({
            status: 'successful',
            message: "No record exist"
        })
    }
}

exports.updateOne = Model => catchAsync(async (req, res, next) => {
  
  if (req.file !== undefined) {
    req.body.photo = req.file.filename;
    fs.unlink('public/img/'+req.user.photo, (err) => {
      if (err) {
        console.log(err)
      }
  });
  } else {
    req.body.photo = req.user.photo;
  }
  req.body.email = req.user.email;
  const doc = await Model.findByIdAndUpdate(req.user.id, req.body, {new:true, runValidators:true})
  if (!doc) {
    return next(new AppError('Record did not fount', 404))
  }
  helperResponse.response(res, "successful", 200, doc);
});


exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, {"active": false})
    if (!doc) {
      return next(new AppError('Record did not fount', 404))
    }
    helperResponse.response(res, "successful", 200);
});

exports.getOne = (Model, id= null) => catchAsync(async (req, res, next) => {

  const doc = await Model.findOne({'_id': uid});
  if (!doc) {
    return next(new AppError('Record did not found invalide `ID`', 404))
  }
  helperResponse.response(res, "successful", 200, doc);
});