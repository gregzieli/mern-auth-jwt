import { Router } from "express";

import { authorize } from "../middleware/auth.js";
import { getUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/whoami", authorize, async (req, res) => {
    const user = await getUser(req.user.id)
    return res.status(200).json({user});
});

export default router;
