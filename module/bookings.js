const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    roomId:{
        type:mongoose.Schema.ObjectId,
        ref:'room',
        required:true
    },
    checkInDate:{
        type:Date,
        required:true
    },
    checkOutDate:{
        type:Date,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'Pending'
    }
})
const Booking = mongoose.model('Booking',bookingSchema);
module.exports={Booking}