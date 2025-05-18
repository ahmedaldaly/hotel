const Joi = require('joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 50,
      unique: true, // هذا خاص بـ MongoDB
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

function Register(obj) {
  const schema = Joi.object({
    email: Joi.string().required().email().min(8).max(50).trim(),
    name: Joi.string().required().trim().min(8).max(50),
    password: Joi.string().required().trim().min(8),
  });
  return schema.validate(obj);
}

function Login(obj) {
  const schema = Joi.object({
    email: Joi.string().required().email().min(8).max(50).trim(),
    password: Joi.string().required().trim().max(50).min(8),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  Register,
  Login,
};
