import { Router } from "express";
import { componentHandler } from "../handlers/componentHandler";

const router = Router();

router.get("/vga", componentHandler("Vga"));
router.get("/cpu", componentHandler("Cpu"));
router.get("/ram", componentHandler("Ram"));
router.get("/storage", componentHandler("Storage"));
router.get("/screen", componentHandler("Screen"));

export default router;