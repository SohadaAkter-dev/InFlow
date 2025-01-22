const { default: mongoose } = require("mongoose")

const DeleteParentChildService = async (Request,ParentModel,ChildModel, joinParentName)=>{
    const session = await mongoose.startSession();
    try{
    await session.startTransaction();

    let deleteId = Request.params.id;
    let userEmail = Request.headers.email;

    let childQuery = {};
    childQuery[joinParentName]= deleteId;
    childQuery.userEmail = userEmail;

    let parentQuery ={};
    parentQuery['_id'] = deleteId;
    parentQuery.userEmail = userEmail;
    
    let childDelete = await ChildModel.deleteMany(childQuery).session(session);
    let parentDelete = await ParentModel.deleteOne(parentQuery).session(session);

    await session.commitTransaction();
    session.endSession();

    return{status:"success",parent: parentDelete, childs: childDelete};
    }
    catch(error){
        await session.abortTransaction();
        session.endSession();
        return{status:"fail",data:error.message}

    }
}
module.exports = DeleteParentChildService