 const { default: mongoose } = require("mongoose")

const CreateParentChildService = async (Request,ParentModel,ChildModel, joinParentName)=>{
    const session = await mongoose.startSession();
    try{
    await session.startTransaction();
    const parentPostBody = Request.body.parent;
    parentPostBody.userEmail = Request.headers.email;
    const parentDataCreation = await ParentModel.create([parentPostBody],{session});
    const childPostBody = Request.body.childs;
    childPostBody.forEach(element=>{
        element[joinParentName]=parentDataCreation[0]['_id'];
        element.userEmail = Request.headers.email;
    });
    const childDataCreation = await ChildModel.insertMany(childPostBody,{session});
    await session.commitTransaction();
    session.endSession();
    return{status:"success",parentData: parentDataCreation, childData: childDataCreation};
    }
    catch(error){
        await session.abortTransaction();
        session.endSession();
        return{status:"fail",data:error.message}

    }
}
module.exports = CreateParentChildService