const otpModel = require("../../models/Users/OtpModel")
const EmailUtility = require("../../utility/SendEmail")
const UserEmailVerifyService = async(Request,DataModel)=>{
    try{
        let email = Request.params.email
        let otp = Math.floor(100000+Math.random()*900000)//random 6 digit number
        let userCheck = await DataModel.aggregate(
            [
                {$match:{email:email}},  
          {$count:"total"},  
        ]
        )
    if(userCheck.length>0){
        await otpModel.create({email:email,otp:otp}) //create otp in db
        let sendMail = await EmailUtility(email,"InFlow Password Verification", `Your OTP is ${otp}`)
        return {status:"succes",data:"OTP Sent Succesfully"}
    }
    else{
        
    return{status:"fail",data: "user not found"}
    }
}
catch(error){
    return{status:"fail",data:error}
}
}
module.exports = UserEmailVerifyService