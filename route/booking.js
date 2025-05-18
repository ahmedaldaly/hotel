const router = require("express").Router();
const {addBooking,deleteBooking,getUserBookings ,search, getAllBookings ,editBooking} = require('../controller/bookingController')
const {Authorization, verifyTokenAndAdmin} = require('../middelware/Authorization')
// /api/v1/booking
router.route('/').post(Authorization,addBooking).get(Authorization,getUserBookings)
router.route('/search').post(search)
router.route('/all').get(verifyTokenAndAdmin,getAllBookings)
router.route('/:id').delete(Authorization,deleteBooking).put(editBooking)

module.exports = router;
