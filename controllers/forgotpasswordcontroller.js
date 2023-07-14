// const User =  require("../model/User")
// const crypto =  require("crypto")
// const bcrypt =  require('bcryptjs')
// const Token =  require("../model/token_model")
// // const resetpassword =  (req,res,next) =>{
// //     User.findOne({email : req.body.email}).then((user)=>{
// //     if(!user){
// //         return next(new Error("Email doesnot exists"))
// //     }
// //     else{
// //         res.send(user)
// // //     let resettoken =  crypto.randomBytes(32).toString("hex")
// // //     bcrypt.hash(resettoken,10).then((hash)=>{
// // //     const token = new Token({
// // //         userId : user._id,
// // //         token : hash,
// // //         createdAt : Date.now()
// // //     }).save()
// // //     console.log(token)
// // //   }).catch(next)
// // }
// //    }).catch(next)

// // }

// // update user password
// exports.updatePassword = catchAsyncErrors(async(req, res, next) => {
//     const user = await User.findById(req.user.id).select("+password");
//     const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
//     if (!isPasswordMatched) {
//         return next(
//             new ErrorHandler("Old password is not matched or incorrect", 400));}
//             if (req.body.newPassword !== req.body.passwordConfirm) {
//                 return next(new ErrorHandler("Passwords are not matched", 400));
//             }user.password = req.body.newPassword;
//             await user.save();sendToken(user, 200, res);});
//             // update user profile details
//             exports.updateProfile = catchAsyncErrors(async(req, res, next) => {
//                 console.log(req.body);
//                 const newUserData = {
//                     name: req.body.name,
//                     email: req.body.email,
//                 }});
                

// module.exports = {
//     resetpassword,
//     updatePassword,
// }