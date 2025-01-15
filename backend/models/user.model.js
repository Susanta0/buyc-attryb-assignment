const { Schema, model } =require("mongoose");
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name:{type: String, required: true,},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    role: { type: String, enum: ['dealer', 'buyer'], required: true },
    createdAt: { type: Date, default: Date.now }
});

const userModel = model("user", UserSchema);

module.exports = userModel
