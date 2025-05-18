const router = require('express').Router()
const {getUser,getUserDatials,editUser,deleteUser} = require('../controller/User')
const {Authorization, verifyTokenAndAdmin} = require('../middelware/Authorization')
router.get('/',verifyTokenAndAdmin,getUser)
router.route('/:id').get(getUserDatials).put(verifyTokenAndAdmin,editUser).delete(verifyTokenAndAdmin,deleteUser)
module.exports =router;