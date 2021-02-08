import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    token: String,
    expires: Date,
    created: { type: Date, default: Date.now },
    revoked: Date,
    replacedByToken: String,
});

schema.virtual("isExpired").get(() => Date.now() >= this.expires);

schema.virtual("isActive").get(() => !this.revoked && !this.isExpired);

schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.id;
        delete ret.user;
    },
});

export default mongoose.model("RefreshToken", schema);
