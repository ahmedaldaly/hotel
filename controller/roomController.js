const asyncHandler = require("express-async-handler");
const { room } = require("../module/rooms");
const cloudinary = require("../middelware/Cloud");
const streamifier = require("streamifier");

// رفع الصور إلى Cloudinary من buffer
const uploadFromBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "rooms" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// إضافة غرفة
module.exports.addRoom = asyncHandler(async (req, res) => {
  try {
    const check = await room.findOne({ roomNumber: req.body.roomNumber });
    if (check) {
      return res.status(400).json({ message: "This room already exists." });
    }

    let images = [];
    for (let file of req.files) {
      const result = await uploadFromBuffer(file.buffer);
      images.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    const addRoom = new room({
      roomNumber: req.body.roomNumber,
      type: req.body.type,
      bedType: req.body.bedType,
      price: req.body.price,
      capacity: req.body.capacity,
      description: req.body.description,
      images,
      isAvailable: req.body.isAvailable ?? true,
      amenities: req.body.amenities || [],
      discount: req.body.discount || 0,
    });

    await addRoom.save();
    res.status(201).json({ message: "Room added successfully", room: addRoom });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// حذف غرفة
module.exports.deleteRoom = asyncHandler(async (req, res) => {
  try {
    const roomToDelete = await room.findById(req.params.id);
    if (!roomToDelete) {
      return res.status(404).json({ message: "Room not found" });
    }

    for (let img of roomToDelete.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await room.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// جلب كل الغرف
module.exports.AllRoom = asyncHandler(async (req, res) => {
  const find = await room.find();
  if (!find) return res.status(404).json({ message: "Not found" });
  res.status(200).json(find);
});

// جلب غرفة محددة
module.exports.GetRoom = asyncHandler(async (req, res) => {
  const find = await room.findById(req.params.id);
  if (!find) return res.status(404).json({ message: "Not found" });
  res.status(200).json(find);
});

// تعديل غرفة
module.exports.edit = asyncHandler(async (req, res) => {
  try {
    let find = await room.findById(req.params.id);
    if (!find) {
      return res.status(404).json({ message: "Room not found" });
    }

    let images = [...find.images];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await uploadFromBuffer(file.buffer);
        images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    find.roomNumber = req.body.roomNumber || find.roomNumber;
    find.type = req.body.type || find.type;
    find.bedType = req.body.bedType || find.bedType;
    find.price = req.body.price || find.price;
    find.capacity = req.body.capacity || find.capacity;
    find.description = req.body.description || find.description;
    find.images = images;
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
