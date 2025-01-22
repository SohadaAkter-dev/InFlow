const ListService = async (Request,DataModel,Array)=>{
    try{
        let pageNumber = Number(Request.params.pageNumber)
        let perPage = Number(Request.params.perPage)
        let searchtext = Request.params.searchtext
        let userEmail = Request.headers.email

        let skip = (pageNumber-1)*perPage;
        let data;

        if(searchtext !== "null"){
        let query = {$or: Array}
        data = await DataModel.aggregate([
            {$match:{userEmail:userEmail}},
            {$match:query},{
            $facet:{
            total:[{$count:"count"}],
            data:[{$skip:skip},{$limit:perPage}]
            }
            }
            ])
        }
        else{
            data = await DataModel.aggregate([
            {$match:{userEmail:userEmail}},
            {
            $facet:{
            total:[{$count:"count"}],
            data:[{$skip:skip},{$limit:perPage}]
            }
            }
            ])
        }
        return{status:"success",data:data}
    }
    catch(error){
        return{status:"fail",data:error}

    }
}
module.exports = ListService