const asyncHandler = require("express-async-handler");
const { User } = require("../module/user");
module.exports.getUser=asyncHandler(async(req,res)=>{
    try{
        const find = await User.find().select("-password")
        if(!find)res.status(404).json({message:'not found users'})
            res.status(200).json(find)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports.getUserDatials=asyncHandler(async(req,res)=>{
    try{
        const find = await User.findById(req.params.id).select("-password")
        if(!find)res.status(404).json({message:'not found user'})
            res.status(200).json(find)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports.editUser=asyncHandler(async(req,res)=>{
    try{
        const find = await User.findById(req.params.id)
        if(!find)res.status(404).json({message:'not found user'})
            const update = await User.findByIdAndUpdate(req.params.id,{
        isAdmin:req.body.Admin
            },{new:true}).select("-password")
            res.status(202).json(update)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports.deleteUser=asyncHandler(async(req,res)=>{
    try{
        const find = await User.findById(req.params.id)
        if(!find)res.status(404).json({message:'not found user'})
          const delet = await User.findByIdAndDelete(req.params.id)
            res.status(202).json({message:'deleted success'})
    }catch(err){
        res.status(500).json(err)
    }
})