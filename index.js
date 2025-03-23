const express = require('express')
const app = express()
const env = require('dotenv').config()
const conectDB = require('./config/db')
app.use(express.json());
conectDB()


// google
const session = require("express-session");
const passport = require("passport");
app.use(
    session({
      secret: "your_secret_key",
      resave: false,
      saveUninitialized: true,
    })
  );
  
  // تشغيل Passport
  app.use(passport.initialize());
  app.use(passport.session());
app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});



app.use('/api/v1/auth',require('./route/auth'))
app.use('/api/v1/user',require('./route/user'))
app.use('/api/v1/room',require('./route/room'))
app.use('/api/v1/booking',require('./route/booking'))
app.use('/api/v1/paypal', require('./route/paypal'));
app.listen(4000, () => {
    console.log(`Server started on port`);
});
