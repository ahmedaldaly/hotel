const router = require('express').Router()
const {Register,login,logout,googleCallback,googleAuth} = require('../controller/authController')
router.post('/register',Register)
router.post('/login',login)

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
// تسجيل خروج
router.get("/logout", logout);
module.exports =router;