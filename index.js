const express = require("express");
const app = express();
require("dotenv").config();
const conectDB = require("./config/db");
conectDB();

const session = require("express-session");
const passport = require("passport");

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});
app.use("/api/v1/auth", require("./route/auth"));
app.use("/api/v1/user", require("./route/user"));
app.use("/api/v1/room", require("./route/room"));
app.use("/api/v1/booking", require("./route/booking"));
app.use("/api/v1/paypal", require("./route/paypal"));

// ✅ تصدير `app` بدلاً من تشغيله مباشرة
module.exports = app;
