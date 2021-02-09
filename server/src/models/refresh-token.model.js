import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    token: { type: String },
    expires: { type: Date },
    created: { type: Date, default: Date.now },
    revoked: { type: Date },
    replacedByToken: { type: String },
});

tokenSchema.virtual("isExpired").get(function () {
    return Date.now() >= this.expires;
});

tokenSchema.virtual("isActive").get(function () {
    return !this.revoked && !this.isExpired;
});

tokenSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        // this is virtual id
        delete ret.id;
        delete ret.user;
    },
});

export default mongoose.model("RefreshToken", tokenSchema);
