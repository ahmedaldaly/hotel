const router = require("express").Router();
const {addBooking,deleteBooking,getUserBookings} = require('../controller/bookingController')
const {Authorization, verifyTokenAndAdmin} = require('../middelware/Authorization')
// /api/v1/booking
router.route('/').post(Authorization,addBooking).get(Authorization,getUserBookings)
router.route('/:id').delete(Authorization,deleteBooking)

module.exports = router;
