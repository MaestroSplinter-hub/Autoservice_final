import { Router } from "express";
import { activarProducto, createProducto, desactivarProducto, getProducto, getProductosAdmin, getProductosCliente, updateProducto } from "../controllers/productoController.js";
import { subidorArchivos } from "../utils/multerUtils.js";

export const router = Router();

router.get("/", getProductosCliente); 
router.get("/admin", getProductosAdmin); 
router.get("/:id", getProducto); 

router.post("/", subidorArchivos.single("imagen"), createProducto); 
router.put("/:id", subidorArchivos.single("imagen"), updateProducto); 

router.patch("/:id/desactivar", desactivarProducto);
router.patch("/:id/activar", activarProducto);

export default router;