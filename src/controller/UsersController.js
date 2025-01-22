const otpModel = require("../models/Users/OtpModel")
const UserModel = require("../models/Users/UsersModel")
const OtpVerifyService = require("../Services/Users/OtpVerifyService")
const ResetPassService = require("../Services/Users/ResetPassService")
const UserCreateService = require("../Services/Users/UserCreateService")
const UserDetailsService = require("../Services/Users/UserDetailsService")
const UserEmailVerifyService = require("../Services/Users/UserEmailVerifyService")
const UserLoginService = require("../Services/Users/UserLoginService")
const UserUpdateService = require("../Services/Users/UserUpdateService")

exports.Registration = async (req,res)=>{
    const result = await UserCreateService(req , UserModel)
    res.status(200).json(result)
}
exports.Login = async (req,res)=>{
    const result = await  UserLoginService(req , UserModel)
    res.status(200).json(result)
}
exports.ProfileDetails = async (req,res)=>{
    const result = await  UserDetailsService(req , UserModel)
    res.status(200).json(result)
}
exports.EmailVerify = async (req,res)=>{
    const result = await  UserEmailVerifyService(req , UserModel)
    res.status(200).json(result)
}
exports.OtpVerify = async (req,res)=>{
    const result = await  OtpVerifyService(req , otpModel)
    res.status(200).json(result)
}

exports.ResetPassword = async (req,res)=>{
    const result = await  ResetPassService(req , UserModel)
    res.status(200).json(result)
}

exports.UpdateUser = async (req,res)=>{
    const result = await  UserUpdateService(req , UserModel)
    res.status(200).json(result)
}