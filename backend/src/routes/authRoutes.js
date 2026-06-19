import { Router } from "express";
import { mostrarLogin, loguear } from "../controllers/authController.js";

export const router = Router();

router.get("/login", mostrarLogin);
router.post("/login", loguear);

export default router;