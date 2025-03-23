const asyncHandler = require("express-async-handler");
const { User, Register,Login } = require("../module/user");
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const passport = require("passport"); // مكتبة المصادقة Passport.js
const GoogleStrategy = require("passport-google-oauth20").Strategy; 



// 🔹 إعداد استراتيجية Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/v1/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await User.findOne({ email: profile.emails[0].value });

        if (!existingUser) {
          existingUser = new User({  // ✅ اسم الكلاس صحيح
            email: profile.emails[0].value,
            name: profile.displayName,
            password: "google-auth", 
          });

          await existingUser.save();
        }

        // ✅ إنشاء توكن JWT
        const token = Jwt.sign(
          { id: existingUser._id, isAdmin: existingUser.isAdmin }, 
          process.env.JWT_SECRET || "secret12727", 
          { expiresIn: "7d" }
        );

        existingUser.token = token;
        await existingUser.save();

        return done(null, existingUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// ✅ مسار بدء تسجيل الدخول عبر Google
module.exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"], 
  prompt: "consent", 
});

// ✅ مسار رد Google بعد تسجيل الدخول
module.exports.googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect("/login");
    }

    req.user = user;
    console.log("User authenticated successfully:", req.user);
    res.redirect(`http://localhost:3000/profile?token=${req.user.token}`);
  })(req, res, next);
};

// ✅ تسجيل خروج المستخدم
module.exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};



module.exports.Register = asyncHandler(async (req, res) => {
  try {
    // التحقق من البيانات المدخلة
    const { error } = Register(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // التحقق من البريد الإلكتروني
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(400).json({ message: 'البريد الإلكتروني مستخدم بالفعل' });
    }

    // تشفير كلمة المرور
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // إنشاء المستخدم الجديد
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    // حفظ المستخدم في قاعدة البيانات
    const savedUser = await newUser.save();

    // إنشاء التوكن
    const token = Jwt.sign(
      {
        id: savedUser._id,
        isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SECRET || 'secret12727', // تأكد من استخدام مفتاح سري قوي
      { expiresIn: '7d' }
    );

    // إضافة التوكن إلى بيانات المستخدم
    savedUser.token = token;

    // إرسال استجابة مع بيانات المستخدم والتوكن
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: 'حدث خطأ ما', error: err.message });
  }
});

module.exports.login = asyncHandler(async(req,res)=>{
    try{
      const email = await User.findOne({email:req.body.email})
      if(!email){
        res.status(404).json({message:'الايميل او الباسورد غلط'})
      }
      const pass = await bcrypt.compare(req.body.password , email.password)
      if(!pass){
        res.status(404).json({message:'الايميل او الباسورد غلط'})
      }
  
      const token = Jwt.sign(
        {
          id: email._id,
          isAdmin: email.isAdmin,
        },
        process.env.JWT_SECRET || 'secret12727', // استبدل بمفتاحك السري
        { expiresIn: '7d' } // مدة صلاحية التوكن
      );
  
      res.status(200).json({user:{
        email:email.email,
        username:email.username,
        token:token,
        Admin:email.isAdmin
      }})
    }catch(err){console.log(err)}
  })