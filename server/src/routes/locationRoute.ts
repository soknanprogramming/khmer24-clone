import { Router } from "express";
import { locationHandler } from "../handlers/locationHandler";

const router = Router();

router.get("/", locationHandler);

export default router;