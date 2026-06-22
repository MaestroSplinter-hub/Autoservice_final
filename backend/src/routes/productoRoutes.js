import { Router } from "express";
import { activarProducto, createProducto, desactivarProducto, getProducto, getProductosAdmin, getProductosCliente, updateProducto } from "../controllers/productoController.js";
import { subidorArchivos } from "../utils/multerUtils.js";
import { validarPaginacion, validarProductoAlta, validarProductoUpdate, validarProductoGet, validarProductoEstado } from "../middlewares/productoMiddle.js";

export const router = Router();

router.get("/", validarPaginacion, getProductosCliente); 
router.get("/admin", validarPaginacion, getProductosAdmin); 
router.get("/:id", validarProductoGet, getProducto); 

router.post("/", subidorArchivos.single("imagen"), validarProductoAlta, createProducto); 
router.put("/:id", subidorArchivos.single("imagen"), validarProductoUpdate, updateProducto); 

router.patch("/:id/desactivar", validarProductoEstado, desactivarProducto);
router.patch("/:id/activar", validarProductoEstado, activarProducto);

export default router;