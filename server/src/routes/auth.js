import { Router } from "express";

import {
    register,
    authenticate,
    refreshToken,
    revokeToken,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);

router.post("/authenticate", authenticate);

router.post("/refresh-token", refreshToken);

router.put("/revokeToken", revokeToken);

export default router;
