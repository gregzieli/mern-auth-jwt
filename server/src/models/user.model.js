import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    registerDate: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
});

userSchema.set("toJSON", {
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    },
});

export default mongoose.model("User", userSchema);
