const jwt = require('jsonwebtoken')
module.exports =(req,res,next)=>{
    const token = req.headers['token']
    jwt.verify(token,"suhu",(error,decoded)=>{
        if(error){
            return res.status(401).json({status:"Unauthorized"})
        }
        else{
            let email = decoded['data']
            req.headers.email = email
            next()
        }
    })
}