const User = require('../model/userModel')
const factory = require('./handlerFactory')

// exports.getAllusers = async(req, res, next) => {
//     const docs = await User.find();
//     if (docs) {
//     res.status(200).render('users/index', docs)
//     } else {
//         res.status(200).json({
//             status: 'successful',
//             message: "No record exist"
//         })
//     }
// }
exports.createUsers = factory.createOne(User)
exports.getAllusers = factory.getAll(User)
exports.getUserById = factory.getOne(User)
exports.deleteUser = factory.deleteOne(User)
exports.updateUser = factory.updateOne(User)