import { Router } from "express";
import { createUsuario } from "../controllers/usuarioController.js";

export const router = Router();

router.post("/", createUsuario);

export default router;