import { Router } from "express";
import { createUsuario } from "../controllers/usuarioController.js";
import { validarUsuarioAdmin } from "../middlewares/productoMiddle.js";

export const router = Router();

router.post("/", validarUsuarioAdmin, createUsuario);

export default router;