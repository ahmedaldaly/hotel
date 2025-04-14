const router = require("express").Router();
const { addRoom ,deleteRoom,AllRoom,GetRoom,edit} = require("../controller/roomController");
const multer = require("multer");
const {Authorization, verifyTokenAndAdmin} = require('../middelware/Authorization')


const upload = multer({ dest:'uploads' });

// تحديث الراوتر ليدعم رفع الصور
router.post("/add-room",verifyTokenAndAdmin,upload.array("files", 5), addRoom);
router.delete('/:id',verifyTokenAndAdmin,deleteRoom)
router.get('/:id',GetRoom)
router.put('/:id',verifyTokenAndAdmin,upload.array("files", 5),edit)
router.get('/',AllRoom)
module.exports = router;
