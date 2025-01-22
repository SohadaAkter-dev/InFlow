const UserDetailsService = async (Request,DataModel)=>{
    try{
        let data =  await DataModel.aggregate(
            [
            {$match:{email:Request.headers.email}},
            {$project:{password:0}}

            ]
        )
        return{status:"success",data:data}
    }
    catch(error){
        return {status:"fail",data:error}
    }
}
module.exports = UserDetailsService