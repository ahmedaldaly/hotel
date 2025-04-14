const express = require('express')
const app = express()
const env = require('dotenv').config()
const cors = require('cors');
const conectDB = require('./config/db')
const Stripe = require("stripe");
app.use(express.json());
conectDB()
app.use(cors({
  origin: 'http://localhost:3000', // اسم الموقع المسموح له يطلب من السيرفر
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // لو بتستخدم كوكيز أو توكنات في الطلب
}));

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

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Test Product",
            },
            unit_amount: req.body.price *100, // السعر بالسنت = $10
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
    console.log(`Server started on port`);
});