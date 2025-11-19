import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    otp: String,
    otpExpire: Date,
});

const User = mongoose.model("User", userSchema);
export default User
