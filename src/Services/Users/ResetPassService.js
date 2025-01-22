const bcrypt = require('bcrypt');
const otpModel = require('../../models/Users/OtpModel'); 
const ResetPassService = async(Request,DataModel)=>{
    try{
        let email = Request.body.email 
        let otp = Request.body.otp  
        let updateStatus= 1
        let newPass= Request.body.password
        const hashedpassword = await bcrypt.hash(newPass,10)
        let otpVerifyCheck = await otpModel.aggregate(
            [
            {$match:{email:email,otp:otp,status:updateStatus}},  
          {$count:"total"},  
        ]
        )
    if(otpVerifyCheck.length>0){
        let passwordUpdate = await DataModel.updateOne ({email:email},{email:email, password:hashedpassword}) 
        return {status:"succes",data: passwordUpdate}
    }
    else{
        
    return{status:"fail",data: "Invalid Password"}
    }
}
catch(error){
    return{status:"fail",data:error}
}
}
module.exports = ResetPassService