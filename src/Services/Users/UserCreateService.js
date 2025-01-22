const bcrypt = require('bcrypt');
const UserCreateService = async(Request,DataModel)=>{
    try{
        const userData = Request.body
        // Hash the password
        const hashPassword = await bcrypt.hash(userData.password,10)
        userData.password = hashPassword
        // create user with hashed password
        const data = await DataModel.create(userData)
        return{satus:"succes",data:data}
    }
    catch(error){
        return {status:"fail",data:error}
    }
}
module.exports = UserCreateService