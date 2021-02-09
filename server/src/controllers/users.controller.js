import User from "../models/user.model.js";

export async function getUser(id) {
    const user = await User.findById(id);
    return user;
}
