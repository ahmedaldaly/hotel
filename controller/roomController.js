const asyncHandler = require("express-async-handler");
const { room } = require("../module/rooms");
const cloudinary = require("../middelware/Cloud");
const fs = require("fs");

module.exports.addRoom = asyncHandler(async (req, res) => {
    try {
        // التأكد من عدم تكرار رقم الغرفة
        const check = await room.findOne({ roomNumber: req.body.roomNumber });
        if (check) {
            return res.status(400).json({ message: "This room already exists." });
        }

        // رفع الصور إلى Cloudinary
        let images = [];
        for (let file of req.files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: "rooms",
            });

            images.push({
                url: result.secure_url, // رابط الصورة المخزنة في Cloudinary
                public_id: result.public_id, // المعرف الخاص بالصورة
            });

            // حذف الملف من السيرفر بعد الرفع إلى Cloudinary
            fs.unlinkSync(file.path);
        }

        // إنشاء كائن الغرفة الجديد
        const addRoom = new room({
            roomNumber: req.body.roomNumber,
            type: req.body.type,
            bedType: req.body.bedType,
            price: req.body.price,
            capacity: req.body.capacity,
            description: req.body.description,
            images: images, // تخزين روابط الصور المرفوعة
            isAvailable: req.body.isAvailable ?? true,
            amenities: req.body.amenities || [],
            discount: req.body.discount || 0,
          
        });

        // حفظ الغرفة في قاعدة البيانات
        await addRoom.save();

        res.status(201).json({ message: "Room added successfully", room: addRoom });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports.deleteRoom = asyncHandler(async (req, res) => {
    try {
        const roomToDelete = await room.findById(req.params.id);
        if (!roomToDelete) {
            return res.status(404).json({ message: "Room not found" });
        }

        // حذف الصور من Cloudinary
        for (let img of roomToDelete.images) {
            await cloudinary.uploader.destroy(img.public_id);
        }

        // حذف الغرفة من قاعدة البيانات
        await room.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: "Room deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports.AllRoom = asyncHandler(async(req,res)=>{
    const find = await room.find()
    if(!find)res.status(404).json({message:'not found'})
        res.status(200).json(find)
})
module.exports.GetRoom = asyncHandler(async(req,res)=>{
    const find = await room.findById(req.params.id)
    if(!find)res.status(404).json({message:'not found'})
        res.status(200).json(find)
})

module.exports.edit = asyncHandler(async (req, res) => {
    try {
        let find = await room.findById(req.params.id);
        if (!find) {
            return res.status(404).json({ message: "Room not found" });
        }

        let images = [...find.images]; // الاحتفاظ بالصور القديمة وإضافة الجديدة

        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, { folder: "rooms" });
                images.push({ url: result.secure_url, public_id: result.public_id });
                fs.unlinkSync(file.path);
            }
        }

        find.roomNumber = req.body.roomNumber || find.roomNumber;
        find.type = req.body.type || find.type;
        find.bedType = req.body.bedType || find.bedType;
        find.price = req.body.price || find.price;
        find.capacity = req.body.capacity || find.capacity;
        find.description = req.body.description || find.description;
        find.images = images; // تحديث الصور بدون حذف السابقة
        find.isAvailable = req.body.isAvailable ?? find.isAvailable;
        find.amenities = req.body.amenities || find.amenities;
        find.discount = req.body.discount || find.discount;
        find.bookedDates = req.body.bookedDates || find.bookedDates;

        await find.save();
        res.status(200).json({ message: "Room updated successfully", room: find });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
