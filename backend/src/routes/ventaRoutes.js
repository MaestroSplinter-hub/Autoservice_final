import { Router } from "express";
import { createVenta, getVenta, getTicketVenta } from "../controllers/ventaController.js";

export const router = Router();

router.post("/", createVenta);
router.get("/:id", getVenta)
router.get("/:id/ticket", getTicketVenta);

export default router;