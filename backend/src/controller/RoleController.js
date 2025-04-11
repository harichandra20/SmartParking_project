const roleModel = require("../models/RoleModel")

const getAllroles = async(req,res)=>{
   const roles = await roleModel.find() //[{}]

   res.json({
   message :  "data feched sucsess fully",
   data:roles
}
)     

}

const addrole  =async(req,res)=>{

    const saveRole= await roleModel.create(req.body)
    
    res.json({
        message : "role added success fully",
        data : saveRole
    })
}
const fetchOneRole = async(req,res)=>{
    //console.log(req.params.id)

    const OneRole = await roleModel.findById(req.params.id)

    res.json({
        message:"fetch success fuluy",
        data:OneRole
    })

}
const deleteRole = async(req,res)=>{
     const deletedRole = await roleModel.findByIdAndDelete(req.params.id)

     res.json({
        message:"Role delete successfully",
        data:deletedRole
     })
}
module.exports = {
    getAllroles,addrole,fetchOneRole,deleteRole
}