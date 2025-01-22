const otpModel = require("../../models/Users/OtpModel")
const EmailUtility = require("../../utility/SendEmail")
const OtpVerifyService = async(Request,DataModel)=>{
    try{
        let email = Request.params.email 
        let otp = Request.params.otp 
        let otpStatus= 0
        let updateOtpStatus= 1
        let otpCheck = await DataModel.aggregate(
            [
            {$match:{email:email,otp:otp,status:otpStatus}},  
          {$count:"total"},  
        ]
        )
    if(otpCheck.length>0){
        let updateOtp = await DataModel.updateOne ({email:email,otp:otp,status:otpStatus},{status:updateOtpStatus}) 
        return {status:"succes",data: updateOtp}
    }
    else{
        
    return{status:"fail",data: "Invalid OTP"}
    }
}
catch(error){
    return{status:"fail",data:error}
}
}
module.exports = OtpVerifyService