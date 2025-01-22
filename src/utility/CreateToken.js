var jwt = require('jsonwebtoken');
const CreateToken = async(data)=>{
    const payload = {
        exp: Math.floor(Date.now()/1000)+(60*60*24),data}
        return await jwt.sign(payload,'suhu')
}
module.exports = CreateToken