import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import RefreshToken from "../models/refresh-token.model.js";
import authService from "../services/auth.service.js";

export async function register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Password too short" });
    }

    try {
        const hasUser = await User.findOne({ email });

        if (hasUser) {
            return res.status(401).json({ message: "User already exists" });
        }

        const user = await User.create(req.body);
        const accessToken = authService.generateAccessToken(user);
        const refreshToken = authService.generateRefreshToken(user);

        await refreshToken.save();

        setTokenCookie(res, refreshToken.token);

        return res.status(201).json({
            ...basicDetails(user),
            accessToken,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function authenticate(req, res) {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = authService.generateAccessToken(user);
        const refreshToken = authService.generateRefreshToken(user);

        await refreshToken.save();

        setTokenCookie(res, refreshToken.token);

        return res.status(201).json({
            ...basicDetails(user),
            accessToken,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function refreshToken(req, res) {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(403).json({ message: "Access denied" });
        }

        // Refreshing the access token, changing the refreshToken is just extra security
        const dbToken = await RefreshToken.findOne({ token }).populate("user");

        if (!dbToken || !dbToken.isActive) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const { user } = dbToken;

        const newRefreshToken = authService.generateRefreshToken(user);
        dbToken.revoked = Date.now();
        dbToken.replacedByToken = newRefreshToken.token;

        await dbToken.save();
        await newRefreshToken.save();

        const accessToken = authService.generateAccessToken(user);

        setTokenCookie(res, newRefreshToken.token);

        return res.status(201).json({
            accessToken,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function revokeToken(req, res) {
    try {
        const token = req.cookies.refreshToken;

        const refreshToken = await RefreshToken.findOne({ token });

        if (!refreshToken || !refreshToken.isActive) {
            return res.status(401).json({ message: "Invalid token" });
        }

        refreshToken.revoked = Date.now();
        await refreshToken.save();

        return res.status(200).json({ message: "Token revoked" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

function setTokenCookie(res, token) {
    // create http only cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
    res.cookie("refreshToken", token, cookieOptions);
}

function basicDetails(user) {
    const { name, email } = user;
    return { name, email };
}
