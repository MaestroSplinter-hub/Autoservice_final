import { Router } from "express";
import { mostrarLogin, loguear, loguearJSON } from "../controllers/authController.js";
import { validarUsuarioAdmin } from "../middlewares/productoMiddle.js";
import { evitarLoginSiSesionValidaHTML, evitarLoginSiSesionValidaJSON } from "../middlewares/authJwtMiddleware.js";

export const router = Router();

router.get("/login", evitarLoginSiSesionValidaHTML, mostrarLogin);

router.post("/login", evitarLoginSiSesionValidaHTML, loguear);

router.post("/api/auth/login", evitarLoginSiSesionValidaJSON, validarUsuarioAdmin, loguearJSON);

export default router;
