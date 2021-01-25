import { Router } from "express";
import { register, login, generateRefreshToken, logout } from "../controllers/AuthController";
import { authorize } from "../middleware/auth";

const router = Router();

//@route POST /api/auth/register
router.post("/auth/register", register);

//@route POST /api/auth/login
router.post("/auth/login", login);

//@route POST /api/auth/refresh-token
router.post("/auth/refresh-token", generateRefreshToken);

//@route DELETE /api/auth/logout
router.delete("/auth/logout", logout);

//@route GET /api/protected_resource
//@access to only authenticated users
router.get("/protected_resource", authorize, (req, res) => {
  return res.status(200).json({ user: req.user });
});

export default router;
