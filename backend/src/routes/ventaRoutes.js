import { Router } from "express";
import { createVenta, getVenta, getTicketVenta } from "../controllers/ventaController.js";
import { validarIdParam, validarVentaCrear } from "../middlewares/productoMiddle.js";

export const router = Router();

router.post("/", validarVentaCrear, createVenta);
router.get("/:id", validarIdParam, getVenta)
router.get("/:id/ticket", validarIdParam, getTicketVenta); // puppeteer

export default router;