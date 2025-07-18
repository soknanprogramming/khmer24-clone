import { Router } from "express";
import { userRegister } from "../handlers/userHandler";

const router = Router();

router.post("/register", userRegister as any);

export default router;