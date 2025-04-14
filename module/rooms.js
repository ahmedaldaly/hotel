
const mongoose = require('mongoose')
const roomSchema = new mongoose.Schema({
    roomNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    type:{
        type:String,
        required:true,
        trim:true,
    },
    bedType:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    
    capacity:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,  
    },
    images:[
        {
            url: { type: String, required: true },
            public_id: { type: String, required: true }
        }
    ],
    isAvailable:{
        type:Boolean,
        required:true,
        default:true
    },
    amenities:[{type:String , default:[]}],
    discount:{
        type:Number
    },
    bookedDates:[{type:Date,default:[]}]

})
const room = mongoose.model('room',roomSchema)

module.exports={room}