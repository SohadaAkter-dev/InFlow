const CreateToken = require("../../utility/CreateToken")
const bcrypt = require('bcrypt');

const UserLoginService = async(Request,DataModel)=>{
    try{
        const {email,password} = Request.body
        const data = await DataModel.aggregate(
            [
            {
            $match:{email:email}},
            {$project:{password:1,email:1}
            }
            ]
        )
        if(data.length === 0){
        return {status:"fail",data:"User not found"}
    }
        else{
            const validPassword = await bcrypt.compare(password, data[0].password)
            if(!validPassword){
                
                return {status:"fail",data:"Invalid password"}
        }
        else{
            const token = await CreateToken(email)
            const userData = await DataModel.aggregate(
            [
            {$match:{email:email}},
            {$project:{password:0, _id:0, createDate:0}}
            ]
            )
            return{status:"succes", data:userData[0],token:token}
        }
        }
    }
    catch(error){
       return {status:"fail", data:error} 
    }
}
module.exports = UserLoginService   