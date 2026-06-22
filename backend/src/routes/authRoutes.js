import { Router } from "express";
import { mostrarLogin, loguear, loguearJSON } from "../controllers/authController.js";
import { validarUsuarioAdmin } from "../middlewares/validaciones.js";

export const router = Router();

router.get("/login", mostrarLogin);

router.post("/login", loguear);

router.post("/api/auth/login", validarUsuarioAdmin, loguearJSON);

export default router;