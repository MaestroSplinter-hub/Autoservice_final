import { Router } from "express";
import { mostrarLogin, loguear } from "../controllers/authController.js";
import { evitarReloguear } from "../middlewares/authJwtMiddleware.js";

export const router = Router();

router.get("/login", evitarReloguear, mostrarLogin);

router.post("/login", evitarReloguear, loguear);

export default router;