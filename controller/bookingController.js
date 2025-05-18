const asyncHandler = require("express-async-handler");
const { Booking } = require("../module/bookings");
const { room } = require("../module/rooms");
const { User } = require("../module/user");
const jwt = require("jsonwebtoken");

module.exports.addBooking = asyncHandler(async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // التحقق مما إذا كانت الغرفة محجوزة بالفعل لنفس المستخدم والتاريخ
        const check = await Booking.findOne({
            userId: decoded.id,
            roomId: req.body.roomId,
            checkInDate: req.body.checkInDate
        });

        if (check) {
            return res.status(401).json({ message: "This room is already reserved for you." });
        }

        // البحث عن الغرفة
        const selectedRoom = await room.findById(req.body.roomId);
        if (!selectedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        // تحويل checkInDate و checkOutDate إلى تواريخ فعلية
        const checkInDate = new Date(req.body.checkInDate);
        const checkOutDate = new Date(req.body.checkOutDate);
        
        // إنشاء قائمة التواريخ المحجوزة
        let bookedDates = [...selectedRoom.bookedDates];

        for (let date = new Date(checkInDate); date <= checkOutDate; date.setDate(date.getDate() + 1)) {
            bookedDates.push(new Date(date)); // تخزين كل يوم محجوز
        }

        // تحديث الغرفة بالتواريخ الجديدة
        selectedRoom.bookedDates = bookedDates;
        await selectedRoom.save();

        // إنشاء الحجز الجديد
        const newBooking = new Booking({
            userId: decoded.id,
            roomId: req.body.roomId,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            totalPrice: req.body.totalPrice
        });

        await newBooking.save();

        res.status(201).json({ message: "Booking added successfully", booking: newBooking });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
module.exports.editBooking = asyncHandler(async(req ,res)=>{
    const find = await Booking.findById(req.params.id)
    if(!find)res.status(404).json({message:'note found'})
        const edit = await Booking.findByIdAndUpdate(req.params.id , {
            status:req.body.status
    },{new:true})
    res.status(201).json(edit)
})
module.exports.deleteBooking = asyncHandler(async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // البحث عن الغرفة المرتبطة بالحجز
        const selectedRoom = await room.findById(booking.roomId);
        if (!selectedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        // إزالة التواريخ المحجوزة من الغرفة
        selectedRoom.bookedDates = selectedRoom.bookedDates.filter(date => 
            date < booking.checkInDate || date > booking.checkOutDate
        );

        await selectedRoom.save();
        await Booking.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: "Booking deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
module.exports.getUserBookings = asyncHandler(async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // البحث عن جميع الحجوزات الخاصة بالمستخدم
        const userBookings = await Booking.find({ userId: decoded.id }).populate("roomId");

        if (userBookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }

        res.status(200).json(userBookings);

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
module.exports.getAllBookings = asyncHandler(async (req, res) => {
    try {

        const userBookings = await Booking.find().populate("roomId");

        if (userBookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }

        res.status(200).json(userBookings);

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
module.exports.search = asyncHandler(async (req, res) => {
    try {
      const searchDate = new Date(req.body.checkInDate);
  
      if (isNaN(searchDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD." });
      }
  
      const availableRooms = await room.find({
        bookedDates: { $nin: [searchDate] }
      });
  
      res.status(200).json(availableRooms);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  