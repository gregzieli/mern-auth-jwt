import { Router } from "express";

import { authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.get("/whoami", authorize, (req, res) => {
    return res.status(200).json({ user: req.user });
});

export default router;
